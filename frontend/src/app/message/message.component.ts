import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info'; // Tipo da mensagem
  @Input() message: string = ''; // Mensagem exibida
  show = false; // Começa invisível
  @Input() title: string = '';

  showMessage(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') {
    this.title = title;
    this.message = message;
    this.type = type;
    this.show = true;

    setTimeout(() => this.show = false, 5000); //  Fecha após 5 segundos
  }
  close() {
    this.show = false;
  }
}
