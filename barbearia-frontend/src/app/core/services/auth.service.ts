import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private usuarioSubject = new BehaviorSubject<Usuario | null>(this.getStoredUser());
  public usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/usuario/login`, { email, senha })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
          this.usuarioSubject.next(response.usuario);
        })
      );
  }

  cadastrar(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario`, dados);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsuario(): Usuario | null {
    return this.usuarioSubject.value;
  }

  private getStoredUser(): Usuario | null {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const usuario = this.getUsuario();
    return usuario?.role === 'admin';
  }
}

