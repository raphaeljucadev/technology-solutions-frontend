import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // ✅ Importa RouterModule para usar <router-outlet>
  template: `<router-outlet></router-outlet>`, // 🔥 Exibe os componentes baseados na rota ativa
})
export class AppComponent {}
