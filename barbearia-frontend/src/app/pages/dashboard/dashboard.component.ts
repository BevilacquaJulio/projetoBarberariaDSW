import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService, Usuario } from '../../core/services/auth.service';
import { AgendamentoService, Agendamento } from '../../core/services/agendamento.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usuario: Usuario | null = null;
  agendamentos: Agendamento[] = [];
  agendamentosProximos: Agendamento[] = [];
  carregando = true;

  constructor(
    private authService: AuthService,
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.authService.getUsuario();
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.listarMeus().subscribe({
      next: (response) => {
        this.agendamentos = response.agendamentos;
        this.filtrarAgendamentosProximos();
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar agendamentos:', err);
        this.carregando = false;
      }
    });
  }

  filtrarAgendamentosProximos() {
    const agora = new Date();
    this.agendamentosProximos = this.agendamentos
      .filter(a => {
        const dataAgendamento = new Date(a.data_hora);
        return dataAgendamento > agora && a.status === 'agendado';
      })
      .slice(0, 3);
  }

  formatarData(dataHora: string): string {
    const data = new Date(dataHora);
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'agendado': 'status-agendado',
      'em_andamento': 'status-andamento',
      'concluido': 'status-concluido',
      'cancelado': 'status-cancelado'
    };
    return classes[status] || '';
  }

  getStatusLabel(status: string): string {
    const labels: any = {
      'agendado': 'Agendado',
      'em_andamento': 'Em Andamento',
      'concluido': 'Concluído',
      'cancelado': 'Cancelado'
    };
    return labels[status] || status;
  }

  getAgendamentosConcluidos(): number {
    return this.agendamentos.filter(a => a.status === 'concluido').length;
  }

  novoAgendamento() {
    this.router.navigate(['/novo-agendamento']);
  }

  verTodos() {
    this.router.navigate(['/agendamentos']);
  }
}

