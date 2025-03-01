import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../config/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: { cpf: string; password: string }): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  }
}
