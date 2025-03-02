// cadastro.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../core/services/cadastro/cadastro.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [CommonModule,NgxMaskDirective, ReactiveFormsModule, MessageComponent],
  providers: [provideNgxMask()]
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  errorMessage: string | null = null;
  token: string | null = null;
  emailPreenchido: string = '';
  loading: boolean = true;
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cadastroService: CadastroService
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}/)]],
      celular: ['', [Validators.pattern(/\(\d{2}\) \d{5}-\d{4}/)]],
      cep: ['', [Validators.required, Validators.pattern(/\d{5}-\d{3}/)]],
      uf: ['', [Validators.required, Validators.maxLength(2)]],
      localidade: ['', [Validators.required, Validators.maxLength(30)]],
      bairro: ['', [Validators.required, Validators.maxLength(40)]],
      logradouro: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.errorMessage = 'Token inválido ou ausente.';
      return;
    }

    this.validarConvite(this.token);
  }

  validarConvite(token: string): void {
    this.cadastroService.validarConvite(token).subscribe({
      next: (response) => {
        if (response.email?.original?.code === 200 && response.email?.original?.data?.email) {
          this.emailPreenchido = response.email.original.data.email;
          this.cadastroForm.patchValue({
            email: this.emailPreenchido
          });
        } else {
          this.errorMessage = response.email?.original?.message || 'Erro ao validar convite.';
        }
      },
      error: (error) => {
        console.error('Erro na requisição:', error);
        this.errorMessage = 'Erro ao validar convite.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  buscarEndereco() {
    const cep = this.cadastroForm.get('cep')?.value;

    if (cep && cep.length === 8) {
      this.cadastroService.buscarEnderecoPorCep(cep).subscribe({
        next: (response) => {
          if (!response.erro) {
            this.cadastroForm.patchValue({
              uf: response.uf,
              localidade: response.localidade,
              bairro: response.bairro,
              logradouro: response.logradouro
            });
          } else {
            this.errorMessage = 'CEP não encontrado.';
          }
        },
        error: (error) => {
          console.error('Erro ao buscar CEP:', error);
          this.errorMessage = 'Erro ao buscar CEP.';
        }
      });
    }
  }

// Função para formatar o CPF
formatarCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para formatar o celular e separar o DDD com parênteses
formatarCelular(celular: string): { ddd: string, numero: string } {
  const ddd = celular.substring(0, 2);  // Pega os 2 primeiros caracteres e adiciona parênteses
  const numero = celular.substring(2);  // Pega o restante como o número do celular

  // Retorna o DDD e o número separados
  return {
    ddd: ddd,
    numero: numero.replace(/(\d{5})(\d{4})/, '$1-$2')  // Formata o número
  };
}


// Função para formatar o CEP
formatarCEP(cep: string): string {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
}


onSubmit(): void {
  const formData = this.cadastroForm.value;


  // Formatar os campos
  const cpfFormatado = this.formatarCPF(formData.cpf); // Mantém a formatação original
  const celularSeparado = this.formatarCelular(formData.celular); // Retorna o DDD e o número separados
  const cepFormatado = this.formatarCEP(formData.cep);


  // 1. Criar usuário
  this.cadastroService.criarUsuario({
    email: this.emailPreenchido,
    name: formData.nome,
    cpf: cpfFormatado
  }).subscribe({
    next: (userResponse) => {
      const userId = userResponse.user.id;


      // 2. Criar endereço
      this.cadastroService.criarEndereco({
        user_id: userId,
        cep: cepFormatado,
        uf: formData.uf,
        localidade: formData.localidade,
        bairro: formData.bairro,
        logradouro: formData.logradouro
      }).subscribe({
        next: (enderecoResponse) => {

          // 3. Criar telefone
          this.cadastroService.criarTelefone({
            user_id: userId,
            telefones: [
              {
                ddd: celularSeparado.ddd,  // "82"
                celular: celularSeparado.numero  // "99903-8044"
              }
            ]
          }).subscribe({
            next: (telefoneResponse) => {
              this.messageComponent.showMessage('Sucesso:', 'Cadastro realizado com sucesso!', 'success');
            },
            error: (telefoneError) => {
              this.errorMessage = 'Erro ao criar telefone.';
              this.messageComponent.showMessage('Erro:',   this.errorMessage, 'error');
            }
          });
        },
        error: (enderecoError) => {
          this.errorMessage = 'Erro ao criar endereço.';
          this.messageComponent.showMessage('Erro:',   this.errorMessage, 'error');
        }
      });
    },
    error: (userError) => {
      this.errorMessage = 'Erro ao criar usuário.';
      this.messageComponent.showMessage('Erro:',   this.errorMessage, 'error');

    }
  });
}


}
