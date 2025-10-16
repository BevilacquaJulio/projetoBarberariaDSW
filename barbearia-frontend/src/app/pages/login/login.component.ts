import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';
  carregando = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.senha) {
      this.erro = 'Preencha todos os campos';
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.authService.login(this.email, this.senha).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.erro || 'Erro ao fazer login';
      }
    });
  }
}

