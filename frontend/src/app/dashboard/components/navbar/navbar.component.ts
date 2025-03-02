import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importe MatToolbarModule
import { HttpClient } from '@angular/common/http'; // Importe HttpClient para fazer a requisição
import { Router } from '@angular/router'; // Para redirecionar o usuário após logout
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    // Recuperar o token do localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Configurar os cabeçalhos com o token
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      // Enviar requisição POST para a API com o token no cabeçalho
      this.http.post(API_ENDPOINTS.AUTH.LOGOUT, {}, { headers }).subscribe(
        (response) => {
          // Limpar o localStorage após logout
          localStorage.removeItem('userId');
          localStorage.removeItem('token');

          // Redirecionar o usuário para a página de login ou outra página
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erro ao realizar o logout:', error);
        }
      );
    } else {
      console.error('Token não encontrado');
    }
  }

}
