import { Component, inject, OnInit } from '@angular/core';
import { ColaboradoresService } from '../../../core/services/colaboradores/colaboradores.service';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

interface Colaborador {
  id: number;
  name: string;
  email: string;
  cpf: string;
  user_type_id: number;

}

interface ApiResponse {
  current_page: number;
  data: Colaborador[];
  first_page_url: string;
  next_page_url: string | null;
  per_page: number;
  total: number;
  user_type_id: number;
}

@Component({
  selector: 'app-gerencial',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './gerencial.component.html',
  styleUrl: './gerencial.component.css'
})
export class GerencialComponent implements OnInit {
  private colaboradoresService = inject(ColaboradoresService);
  private colaboradoresSubject = new BehaviorSubject<Colaborador[]>([]);
  colaboradores$: Observable<Colaborador[]> = this.colaboradoresSubject.asObservable();
private router = inject(Router);
  currentPage = 1;
  totalPages = 0;
  nextPageUrl: string | null = null;
  prevPageUrl: string | null = null;
  searchQuery = '';
  displayedColumns: string[] = ['name', 'email', 'cpf', 'perfil', 'visualizar', 'editar'];
  private initialData: Colaborador[] = [];
  searchTerm: string = '';
  userTypes: any[] = [];

  ngOnInit(): void {
    this.loadUserTypes();
    this.loadInitialData();
  }


  // Função para carregar os tipos de usuários
  loadUserTypes(): void {
    this.colaboradoresService.getUserTypes().subscribe({
      next: (response) => {
        this.userTypes = response;
      },
      error: (error) => {
        console.error('Erro ao carregar tipos de usuários:', error);
      }
    });
  }

    // Função para pegar o nome do tipo de usuário com base no ID
    getUserTypeName(userTypeId: number): string {
      const userType = this.userTypes.find(type => type.id === userTypeId);
      return userType ? userType.name : 'Desconhecido';
    }


  loadInitialData(): void {
    this.colaboradoresService.getInitialData().subscribe({
      next: (initialData) => {
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
      this.colaboradoresSubject.next(data);
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
    this.router.navigate([`dashboard/gerencial/informacoes`, element.id]);

  }


  editarPerfil(element: Colaborador): void {
    const perfilName = this.getUserTypeName(element.user_type_id);


    this.router.navigate([`dashboard/gerencial/atualizar`, element.id, perfilName]);

  }

  exportToExcel(): void {
    const currentData = this.colaboradoresSubject.getValue();

    if (currentData.length > 0) {
      // Usa os dados filtrados da pesquisa
      const worksheet = XLSX.utils.json_to_sheet(currentData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Colaboradores');
      XLSX.writeFile(workbook, 'colaboradores.xlsx');
    } else {
      // Caso contrário, busca todas as páginas novamente
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
  performSearch(): void {
    this.searchQuery = this.searchTerm.trim(); // Sincroniza searchQuery com searchTerm

    if (!this.searchQuery) {
      // Se o campo estiver vazio, recarrega os dados iniciais
      this.loadInitialData();
      return;
    }

    this.colaboradoresService.searchColaboradores(this.searchQuery).subscribe({
      next: (response) => {
        this.colaboradoresSubject.next(response.data);
        this.initialData = response.data;
        this.totalPages = 1;
        this.currentPage = 1;
      },
      error: (error) => {
        console.error('Erro na pesquisa:', error);
      }
    });
  }



}
