import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ConvitesService } from '../../../../core/services/convites/convites.service';
import { MessageComponent } from '../../../../message/message.component';
import { HttpResponse } from '@angular/common/http'; // Importe HttpResponse

@Component({
  selector: 'app-convidar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageComponent],
  templateUrl: './convidar.component.html',
  styleUrls: ['./convidar.component.scss']
})
export class ConvidarComponent {
  form: FormGroup;
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private convitesService = inject(ConvitesService); // Injete o serviço
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.value.email;

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

      this.convitesService.enviarConvite(email,token,user_id).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this.messageComponent.showMessage('Sucesso:', 'Convite enviado com sucesso!', 'success');
            this.form.reset(); // Limpa o formulário após o sucesso
          } else if (response.status === 200) { // Caso a API retorne 200 para sucesso
            this.messageComponent.showMessage('Sucesso:', 'Convite enviado com sucesso!', 'success');
            this.form.reset();
          } else {
            this.messageComponent.showMessage('Aviso:', 'Convite enviado, mas com status inesperado.', 'warning');
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
