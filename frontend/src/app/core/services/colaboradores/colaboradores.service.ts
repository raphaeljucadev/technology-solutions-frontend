import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../config/api-endpoints';

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

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {
  private apiUrl = API_ENDPOINTS.COLABORADORES.colaborador;
  private initialUrl = API_ENDPOINTS.COLABORADORES.colaborador;

  constructor(private http: HttpClient) { }

  public getInitialData(): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get(this.initialUrl, { headers });
  }

  getColaboradores(page: number = 1, searchQuery: string = ''): Observable<ApiResponse> { // Retorna ApiResponse
    const token = localStorage.getItem('token');
    let url = `${this.apiUrl}?page=${page}`;
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<ApiResponse>(url, { headers }); // Retorna ApiResponse
  }
}
