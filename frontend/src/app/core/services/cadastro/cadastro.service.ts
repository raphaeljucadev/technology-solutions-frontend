import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_ENDPOINTS } from '../../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  // Método para validar o convite via token
  validarConvite(token: string): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.CONVITES.CONVITE_TOKEN}/${token}`).pipe(
      catchError((error) => {
        // Retorna o erro com a mensagem do convite
        return of({
          error: true,
          message: error?.error?.email?.original?.message || 'Erro ao verificar convite.'
        });
      })
    );
  }

// Método para buscar o endereço pelo CEP
buscarEnderecoPorCep(cep: string): Observable<any> {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  return this.http.get<any>(url);
}

criarUsuario(userData: any): Observable<any> {
  return this.http.post(API_ENDPOINTS.CADASTRO.user, userData);
}

criarEndereco(enderecoData: any): Observable<any> {
  return this.http.post(API_ENDPOINTS.CADASTRO.endereco, enderecoData);
}

criarTelefone(telefoneData: any): Observable<any> {
  return this.http.post(API_ENDPOINTS.CADASTRO.telefone, telefoneData);
}


}
