import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ColaboradoresService } from '../../../../core/services/colaboradores/colaboradores.service';

@Component({
  selector: 'app-informacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informacoes.component.html',
  styleUrls: ['./informacoes.component.css']
})
export class InformacoesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private colaboradoresService = inject(ColaboradoresService);

  colaborador: any = null;
  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadColaborador(+id);
    }
  }

  loadColaborador(id: number): void {
    this.colaboradoresService.getColaboradorById(id).subscribe({
      next: (data) => {
        this.colaborador = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar colaborador:', error);
        this.loading = false;
      }
    });
  }
}
