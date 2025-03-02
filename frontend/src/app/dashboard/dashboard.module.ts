import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HomeComponent } from './pages/home/home.component';
import { ConvidarComponent } from './pages/convites/convidar/convidar.component';
import { StatusComponent } from './pages/convites/status/status.component';
import { ListarComponent } from './pages/perfis/listar/listar.component';
import { CadastrarComponent } from './pages/perfis/cadastrar/cadastrar.component';
import { GerencialComponent } from './pages/gerencial/gerencial.component';


@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    ConvidarComponent,
    StatusComponent,
    ListarComponent,
    CadastrarComponent,
    GerencialComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    DashboardRoutingModule
  ],
  exports: [ MainComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    ConvidarComponent,
    StatusComponent,
    ListarComponent,
    CadastrarComponent,
    GerencialComponent]
})
export class DashboardModule { }
