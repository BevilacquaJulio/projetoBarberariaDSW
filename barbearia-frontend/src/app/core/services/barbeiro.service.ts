import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Barbeiro {
  id: number;
  nome: string;
  especialidade: string;
  foto_url: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {
  private apiUrl = `${environment.apiUrl}/barbeiros`;

  constructor(private http: HttpClient) {}

  listar(): Observable<{ barbeiros: Barbeiro[] }> {
    return this.http.get<{ barbeiros: Barbeiro[] }>(this.apiUrl);
  }

  buscar(id: number): Observable<Barbeiro> {
    return this.http.get<Barbeiro>(`${environment.apiUrl}/barbeiro/${id}`);
  }
}

