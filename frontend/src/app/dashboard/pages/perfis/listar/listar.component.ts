import { Component, inject, ViewChild } from '@angular/core';
import { PerfisService } from '../../../../core/services/perfis/perfis.service';
import { MessageComponent } from '../../../../message/message.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [MessageComponent,CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  status: any[] = [];
  private perfisservice = inject(PerfisService);
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;

  ngOnInit() {
    this.listarStatus();

  }
  listarStatus() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.messageComponent.showMessage('Erro:', 'Token não encontrado. Faça login novamente.', 'error');
      return;
    }

    this.perfisservice.listarConvites(token).subscribe({
      next: (response) => {
        this.status = response;

      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Erro ao carregar lista.';

        this.messageComponent.showMessage('Erro:', errorMessage, 'error');
      }
    });


  }



}
