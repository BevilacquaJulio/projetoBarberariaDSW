import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Temporariamente permitir todas as rotas (desativando a exigência de login).
  // Para reverter, restaurar a lógica original: verificar isAuthenticated() e,
  // se não autenticado, redirecionar para '/login'.
  // OBS: esta alteração é propositalmente simples e temporária.
  return true;
};

