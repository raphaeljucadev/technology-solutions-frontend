import { Component, inject, ViewChild } from '@angular/core';
import { ConvitesService } from '../../../../core/services/convites/convites.service';
import { MessageComponent } from '../../../../message/message.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-status',
  standalone: true,
  imports: [MessageComponent,CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  convites: any[] = [];
  private convitesService = inject(ConvitesService);
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  ngOnInit() {
    this.listarConvites();

  }

  listarConvites() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.messageComponent.showMessage('Erro:', 'Token não encontrado. Faça login novamente.', 'error');
      return;
    }

    this.convitesService.listarConvites(token).subscribe({
      next: (response) => {
        if (response.code === 200) { // Verifica se o código é 200
          this.convites = response.data; // Atribui o array de convites à variável
        } else {
          this.messageComponent.showMessage('Erro:', response.data, 'error');
        }
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Erro ao carregar lista.';

        this.messageComponent.showMessage('Erro:', errorMessage, 'error');
      }
    });


  }


}
