import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BarbeiroService } from '../../core/services/barbeiro.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-novo-barbeiro',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './novo-barbeiro.component.html',
  styleUrls: ['./novo-barbeiro.component.scss']
})
export class NovoBarbeiroComponent implements OnInit {
  nome = '';
  especialidade = '';
  telefone = '';
  email = '';

  erro = '';
  sucesso = '';
  carregando = false;

  constructor(
    private barbeiroService: BarbeiroService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Verificar se é admin
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/dashboard']);
      return;
    }
  }

  criarBarbeiro() {
    if (!this.nome.trim()) {
      this.erro = 'O nome é obrigatório';
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.sucesso = '';

    const barbeiro = {
      nome: this.nome.trim(),
      especialidade: this.especialidade.trim() || undefined,
      telefone: this.telefone.trim() || undefined,
      email: this.email.trim() || undefined,
      ativo: true
    };

    this.barbeiroService.criar(barbeiro).subscribe({
      next: () => {
        this.sucesso = 'Barbeiro cadastrado com sucesso! Redirecionando...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.erro || 'Erro ao cadastrar barbeiro';
      }
    });
  }

  cancelar() {
    this.router.navigate(['/dashboard']);
  }
}

