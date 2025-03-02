import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../config/api-endpoints';

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

    console.log(token);

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get(this.initialUrl, { headers });
  }

  getColaboradores(page: number = 1, searchQuery: string = ''): Observable<ApiResponse> {
    const token = localStorage.getItem('token');
    let url = `${this.apiUrl}?page=${page}`;
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<ApiResponse>(url, { headers });
  }

  searchColaboradores(searchTerm: string): Observable<ApiResponse> {
    const params = new HttpParams().set('query', searchTerm);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<ApiResponse>(API_ENDPOINTS.COLABORADORES.search, { params, headers });
  }

  getColaboradorById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }
 // Método para buscar os tipos de usuários
 getUserTypes(): Observable<any> {
  const token = localStorage.getItem('token');
  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  return this.http.get<any>(API_ENDPOINTS.COLABORADORES.get_status, { headers });
}

// Método para atualizar o perfil do usuário
updateUserProfile(id: string, data: any): Observable<any> {
  const token = localStorage.getItem('token');

  const userId = localStorage.getItem('userId');

  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
const dados = {
  user_type_id: data.user_type_id,
  id_user_alterar: id,
  password: data.password ? data.password : null
}
  return this.http.put<any>(`${this.apiUrl}/${userId}/perfil`, dados, { headers });
}



}
