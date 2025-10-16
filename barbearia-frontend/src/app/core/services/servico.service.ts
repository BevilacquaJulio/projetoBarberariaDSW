import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private apiUrl = `${environment.apiUrl}/servicos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<{ servicos: Servico[] }> {
    return this.http.get<{ servicos: Servico[] }>(this.apiUrl);
  }

  buscar(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${environment.apiUrl}/servico/${id}`);
  }
}

