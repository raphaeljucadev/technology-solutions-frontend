import { Component, ViewChild,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessageComponent } from '../../message/message.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, MessageComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [provideNgxMask()]
})
export class LoginComponent {
    @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  showPassword = false;

  constructor() {
    this.loginForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required]]

    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  get f() {
    return this.loginForm.controls;
  }

  formatCPF(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  onSubmit() {
    if (this.loginForm.valid) {



      const formValue = this.loginForm.value;

      const cpfFormatado = this.formatCPF(formValue.cpf);


      const payload = {
        cpf: cpfFormatado,
        password: formValue.password
      };

      this.authService.login(payload).subscribe({
        next: (response) => {
          this.messageComponent.showMessage('Sucesso!', 'Login realizado com sucesso!', 'success');
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Erro ao realizar login!';
          this.messageComponent.showMessage('Erro:', errorMessage, 'error');
        }
      });
    }
  }


  onForgotPassword() {
  }
}
