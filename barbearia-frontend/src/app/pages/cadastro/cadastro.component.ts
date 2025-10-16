import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  nome = '';
  email = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';
  erro = '';
  sucesso = '';
  carregando = false;

  constructor(private authService: AuthService, private router: Router) {}

  cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      this.erro = 'Preencha todos os campos obrigatórios';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem';
      return;
    }

    if (this.senha.length < 6) {
      this.erro = 'A senha deve ter no mínimo 6 caracteres';
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.sucesso = '';

    const dados = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha
    };

    this.authService.cadastrar(dados).subscribe({
      next: () => {
        this.sucesso = 'Cadastro realizado com sucesso! Redirecionando...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.erro || 'Erro ao realizar cadastro';
      }
    });
  }
}

