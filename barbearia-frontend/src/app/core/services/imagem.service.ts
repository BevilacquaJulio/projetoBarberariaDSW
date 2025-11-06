import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {
  // Ajuste: backend usa rota com prefixo /api
  private apiUrl = `${environment.apiUrl}/api/imagens`;

  constructor(private http: HttpClient) { }

  // Listar todas as imagens (com metadados)
  listarImagens(): Observable<{ imagens: { id: number; filename: string; servico_id?: number; titulo?: string; descricao?: string; preco?: number }[] }> {
    return this.http.get<{ imagens: { id: number; filename: string; servico_id?: number; titulo?: string; descricao?: string; preco?: number }[] }>(this.apiUrl);
  }

  // Upload de uma nova imagem com metadados opcionais
  uploadImagem(file: File, metadata?: { titulo?: string; descricao?: string; preco?: number }): Observable<any> {
    const formData = new FormData();
    formData.append('imagem', file);
    if (metadata?.titulo) formData.append('titulo', metadata.titulo);
    if (metadata?.descricao) formData.append('descricao', metadata.descricao);
    if (metadata?.preco != null) formData.append('preco', String(metadata.preco));

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // Obter a URL completa de uma imagem
  getImagemUrl(filename: string): string {
    return `${this.apiUrl}/${filename}`;
  }
}