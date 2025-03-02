import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ConvitesService {
  constructor(private http: HttpClient) {}

  enviarConvite(email: string, token: string,user_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adiciona o Bearer Token no cabeçalho
    });

    return this.http.post(API_ENDPOINTS.CONVITES.CONVITE, { email,user_id }, { headers , observe: 'response'}); // Envia o email e o cabeçalho
  }

  listarConvites(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(API_ENDPOINTS.CONVITES.CONVITE, { headers });
  }

  listarStatusConvites(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(API_ENDPOINTS.CONVITES.STATUS_CONVITE, { headers });
  }

}
