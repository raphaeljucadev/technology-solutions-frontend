import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './dashboard/components/main/main.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { ConvidarComponent } from './dashboard/pages/convites/convidar/convidar.component';
import { StatusComponent } from './dashboard/pages/convites/status/status.component';
import { ListarComponent } from './dashboard/pages/perfis/listar/listar.component';
import { CadastrarComponent } from './dashboard/pages/perfis/cadastrar/cadastrar.component';
import { GerencialComponent } from './dashboard/pages/gerencial/gerencial.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'convites/convidar', component: ConvidarComponent },
      { path: 'convites/status', component: StatusComponent },
      { path: 'perfis/listar', component: ListarComponent },
      { path: 'perfis/cadastrar', component: CadastrarComponent },
      { path: 'gerencial', component: GerencialComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
