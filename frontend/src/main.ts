import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './app/dashboard/components/main/main.component';
import { HomeComponent } from './app/dashboard/pages/home/home.component';
import { ConvidarComponent } from './app/dashboard/pages/convites/convidar/convidar.component';
import { StatusComponent } from './app/dashboard/pages/convites/status/status.component';
import { ListarComponent } from './app/dashboard/pages/perfis/listar/listar.component';
import { CadastrarComponent } from './app/dashboard/pages/perfis/cadastrar/cadastrar.component';
import { AtualizarPerfilComponent } from './app/dashboard/pages/gerencial/atualizar-perfil/atualizar-perfil.component';
import { InformacoesComponent } from './app/dashboard/pages/gerencial/informacoes/informacoes.component';
import { GerencialComponent } from './app/dashboard/pages/gerencial/gerencial.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authGuard } from './app/core/services/auth/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        component: MainComponent,
        canActivate: [authGuard], // Adicione o AuthGuard aqui
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'convites/convidar', component: ConvidarComponent },
          { path: 'convites/status', component: StatusComponent },
          { path: 'perfis/listar', component: ListarComponent },
          { path: 'perfis/cadastrar', component: CadastrarComponent },
          { path: 'gerencial', component: GerencialComponent },
          { path: 'gerencial/atualizar/:id/:perfilName', component: AtualizarPerfilComponent },
          { path: 'gerencial/informacoes/:id', component: InformacoesComponent },

        ]
      },
      { path: '**', redirectTo: 'login' }
    ])
  ]
});
