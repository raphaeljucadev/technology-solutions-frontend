import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PerfisService } from '../../../../core/services/perfis/perfis.service';
import { MessageComponent } from '../../../../message/message.component';
import { HttpResponse } from '@angular/common/http'; // Importe HttpResponse

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageComponent],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
form: FormGroup;
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private perfisService = inject(PerfisService); // Injete o serviço
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;


  constructor() {
    this.form = this.fb.group({
      perfil: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const name = this.form.value.perfil;

      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('userId');

      if (!token) {
        this.messageComponent.showMessage('Erro:', 'Token não encontrado. Faça login novamente.', 'error');
        return; // Sai da função se o token não for encontrado
      }

      if (!user_id) {
        this.messageComponent.showMessage('Erro:', 'ID não encontrado. Faça login novamente.', 'error');
        return; // Sai da função se o token não for encontrado
      }

      this.perfisService.cadastrarPerfil(name,token).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this.messageComponent.showMessage('Sucesso:', 'Cadastro realizado com sucesso!', 'success');
            this.form.reset(); // Limpa o formulário após o sucesso
          } else if (response.status === 200) { // Caso a API retorne 200 para sucesso
            this.messageComponent.showMessage('Sucesso:', 'Cadastro realizado com sucesso!', 'success');
            this.form.reset();
          } else {
            this.messageComponent.showMessage('Aviso:', 'Cadastro realizado.', 'warning');
            this.form.reset();
          }
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Erro ao enviar email';
          this.messageComponent.showMessage('Erro:', errorMessage, 'error');
        }
      });
    }
  }

}
