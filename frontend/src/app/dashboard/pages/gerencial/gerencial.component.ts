import { Component, inject, OnInit } from '@angular/core';
import { ColaboradoresService } from '../../../core/services/colaboradores/colaboradores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';

interface Colaborador {
  id: number;
  name: string;
  email: string;
  cpf: string;
}

interface ApiResponse {
  current_page: number;
  data: Colaborador[];
  first_page_url: string;
  next_page_url: string | null;
  per_page: number;
  total: number;
}

@Component({
  selector: 'app-gerencial',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './gerencial.component.html',
  styleUrl: './gerencial.component.css'
})
export class GerencialComponent implements OnInit {
  private colaboradoresService = inject(ColaboradoresService);
  colaboradores$: Observable<Colaborador[]> | undefined;
  currentPage = 1;
  totalPages = 0;
  nextPageUrl: string | null = null;
  prevPageUrl: string | null = null;
  searchQuery = '';
  displayedColumns: string[] = ['name', 'email', 'cpf', 'visualizar', 'editar'];
  private initialData: Colaborador[] = [];

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.colaboradoresService.getInitialData().subscribe({
      next: (initialData) => {
        console.log('Initial Data:', initialData);
        this.initialData = initialData;
        this.loadColaboradores();
      },
      error: (error) => {
        console.error('Error loading initial data:', error);
      }
    });
  }

  loadColaboradores(): void {
    this.colaboradoresService.getColaboradores(this.currentPage, this.searchQuery).pipe(
      map(response => {
        this.totalPages = Math.ceil(response.total / response.per_page);
        this.nextPageUrl = response.next_page_url;
        this.prevPageUrl = response.first_page_url;
        return response.data;
      })
    ).subscribe(data => {
      this.colaboradores$ = new Observable(observer => observer.next(data));
    });
  }

  search(): void {
    this.currentPage = 1;
    this.loadColaboradores();
  }

  nextPage(): void {
    if (this.nextPageUrl) {
      this.currentPage++;
      this.loadColaboradores();
    }
  }

  prevPage(): void {
    if (this.prevPageUrl && this.currentPage > 1) {
      this.currentPage--;
      this.loadColaboradores();
    }
  }

  visualizarDados(element: Colaborador): void {
    console.log('Visualizar Dados:', element);
  }

  editarPerfil(element: Colaborador): void {
    console.log('Editar Perfil:', element);
  }

  exportToExcel(): void {
    let allPages: Observable<Colaborador[]>[] = [];
    for (let page = 1; page <= this.totalPages; page++) {
      allPages.push(
        this.colaboradoresService.getColaboradores(page, this.searchQuery).pipe(
          map(response => response.data)
        )
      );
    }

    forkJoin(allPages).subscribe(pages => {
      const allData = pages.reduce((acc, val) => acc.concat(val), []);
      const worksheet = XLSX.utils.json_to_sheet(allData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Colaboradores');
      XLSX.writeFile(workbook, 'colaboradores.xlsx');
    });
  }
}
