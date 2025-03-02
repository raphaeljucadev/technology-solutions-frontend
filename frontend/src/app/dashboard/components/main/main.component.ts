import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'; // Importe o MatSidenavModule
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, SidebarComponent, NavbarComponent], // Adicione MatSidenavModule aos imports
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent { }
