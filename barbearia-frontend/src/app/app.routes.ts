import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.CadastroComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'agendamentos',
    loadComponent: () => import('./pages/agendamentos/agendamentos.component').then(m => m.AgendamentosComponent),
    canActivate: [authGuard]
  },
  {
    path: 'novo-agendamento',
    loadComponent: () => import('./pages/novo-agendamento/novo-agendamento.component').then(m => m.NovoAgendamentoComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

