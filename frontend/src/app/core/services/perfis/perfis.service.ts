import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class PerfisService {

  constructor(private http: HttpClient) {}



  cadastrarPerfil(name: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adiciona o Bearer Token no cabeçalho
    });

    return this.http.post(API_ENDPOINTS.PERFIL.user_types, { name }, { headers , observe: 'response'}); // Envia o email e o cabeçalho
  }

  listarConvites(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(API_ENDPOINTS.PERFIL.user_types, { headers });
  }

}
