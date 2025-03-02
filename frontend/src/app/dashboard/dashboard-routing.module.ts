import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { ConvidarComponent } from './pages/convites/convidar/convidar.component';
import { StatusComponent } from './pages/convites/status/status.component';
import { ListarComponent } from './pages/perfis/listar/listar.component';
import { CadastrarComponent } from './pages/perfis/cadastrar/cadastrar.component';
import { GerencialComponent } from './pages/gerencial/gerencial.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },

      // Rotas de Convites
      {
        path: 'convites',
        children: [
          { path: 'convidar', component: ConvidarComponent },
          { path: 'status', component: StatusComponent },
        ]
      },

      // Rotas de Perfis
      {
        path: 'perfis',
        children: [
          { path: 'listar', component: ListarComponent },
          { path: 'cadastrar', component: CadastrarComponent },
        ]
      },

      { path: 'gerencial', component: GerencialComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
