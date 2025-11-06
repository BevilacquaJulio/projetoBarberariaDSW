import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email?: string;
  endereco?: string;
  ativo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}

  listar(): Observable<{ usuarios: Cliente[] }> {
    return this.http.get<{ usuarios: Cliente[] }>(`${environment.apiUrl}/usuarios`);
  }

  criar(cliente: Partial<Cliente>): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  buscar(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/perfil`);
  }
}

