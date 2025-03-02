import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColaboradoresService } from '../../../../core/services/colaboradores/colaboradores.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../../../../message/message.component';
import { HttpResponse } from '@angular/common/http'; // Importe HttpResponse

@Component({
  selector: 'app-atualizar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MessageComponent],
  templateUrl: './atualizar-perfil.component.html',
  styleUrls: ['./atualizar-perfil.component.css']
})
export class AtualizarPerfilComponent implements OnInit {
  perfilForm: FormGroup;
  userTypes: any[] = [];
  showPasswordField: boolean = false;
  perfilName: string | null = null;
  showPassword = false;
  id:string | null = null;
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  constructor(
    private fb: FormBuilder,
    private apiService: ColaboradoresService,
    private route: ActivatedRoute
  ) {
    this.perfilForm = this.fb.group({
      user_type_id: [null, Validators.required],
      id_user_alterar: [null, Validators.required],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.perfilName = params.get('perfilName');
      this.id = params.get('id');

      this.loadUserTypes();
    });
  }

  loadUserTypes(): void {
    this.apiService.getUserTypes().subscribe(
      (response) => {
        this.userTypes = response;

        if (this.perfilName) {
          const userType = this.userTypes.find(type => type.name === this.perfilName);
          if (userType) {
            this.perfilForm.patchValue({
              user_type_id: userType.id,
              id_user_alterar: userType.id,
            });
            this.togglePasswordField(userType.name);
          }
        }
      },
      (error) => {
      }
    );
  }

  togglePasswordField(userTypeName: string): void {
    if (userTypeName === 'Administrador' || userTypeName === 'Gente e Cultura') {
      this.showPasswordField = true;
      this.perfilForm.get('password')?.setValidators([Validators.required]);
    } else {
      this.showPasswordField = false;
      this.perfilForm.get('password')?.clearValidators();
    }
    this.perfilForm.get('password')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.perfilForm.valid && this.id) {
      const formData = this.perfilForm.value;
      this.apiService.updateUserProfile(this.id, formData).subscribe({
        next: (response: any) => {  // Altere o tipo de response para 'any'
          console.log(response);  // Verifique o formato da resposta
          if (response.code === 200) {  // Use 'code' em vez de 'status'
            // Sucesso - Perfil atualizado
            this.messageComponent.showMessage('Sucesso:', response.message, 'success');
          } else if (response.code === 204) {
            // Sucesso - Nenhum conteúdo retornado (atualização bem-sucedida)
            this.messageComponent.showMessage('Sucesso:', response.message, 'success');
          } else {
            // Status inesperado
            this.messageComponent.showMessage('Aviso:', `Status de resposta inesperado: ${response.code}`, 'warning');
          }
        },
        error: (error) => {
          // Erro
          let errorMessage = 'Erro ao atualizar perfil';
          if (error.error?.message) {
            errorMessage = error.error.message;  // Exibe a mensagem de erro do corpo
          } else if (error.message) {
            errorMessage = error.message;  // Exibe a mensagem geral do erro
          }
          this.messageComponent.showMessage('Erro:', errorMessage, 'error');
        }
      });
    } else {
      // Formulário inválido ou ID não encontrado
      this.messageComponent.showMessage('Aviso:', 'Formulário inválido ou ID não encontrado.', 'warning');
    }

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onUserTypeChange(event: any): void {
    const selectedUserId = event.target.value;
    const selectedUserType = this.userTypes.find(type => type.id === parseInt(selectedUserId));
    if (selectedUserType) {
      this.togglePasswordField(selectedUserType.name);
    }
  }
}
