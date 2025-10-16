import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Agendamento {
  id?: number;
  usuario_id?: number;
  barbeiro_id: number;
  servico_id: number;
  data_hora: string;
  status?: string;
  observacoes?: string;
  barbeiro_nome?: string;
  barbeiro_foto?: string;
  servico_nome?: string;
  servico_preco?: number;
  servico_duracao?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = `${environment.apiUrl}/agendamento`;

  constructor(private http: HttpClient) {}

  criar(agendamento: Agendamento): Observable<any> {
    return this.http.post(this.apiUrl, agendamento);
  }

  listarMeus(): Observable<{ agendamentos: Agendamento[] }> {
    return this.http.get<{ agendamentos: Agendamento[] }>(`${environment.apiUrl}/agendamentos`);
  }

  buscar(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/${id}`);
  }

  alterarStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

