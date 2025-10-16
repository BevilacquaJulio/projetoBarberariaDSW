import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AgendamentoService, Agendamento } from '../../core/services/agendamento.service';

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  carregando = true;
  erro = '';
  sucesso = '';

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.carregando = true;
    this.agendamentoService.listarMeus().subscribe({
      next: (response) => {
        this.agendamentos = response.agendamentos;
        this.carregando = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar agendamentos';
        this.carregando = false;
        console.error(err);
      }
    });
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

  cancelarAgendamento(id: number | undefined) {
    if (!id) return;

    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) {
      return;
    }

    this.agendamentoService.alterarStatus(id, 'cancelado').subscribe({
      next: () => {
        this.sucesso = 'Agendamento cancelado com sucesso!';
        this.carregarAgendamentos();
        setTimeout(() => this.sucesso = '', 3000);
      },
      error: (err) => {
        this.erro = 'Erro ao cancelar agendamento';
        console.error(err);
        setTimeout(() => this.erro = '', 3000);
      }
    });
  }

  deletarAgendamento(id: number | undefined) {
    if (!id) return;

    if (!confirm('Tem certeza que deseja deletar este agendamento? Esta ação não pode ser desfeita.')) {
      return;
    }

    this.agendamentoService.deletar(id).subscribe({
      next: () => {
        this.sucesso = 'Agendamento deletado com sucesso!';
        this.carregarAgendamentos();
        setTimeout(() => this.sucesso = '', 3000);
      },
      error: (err) => {
        this.erro = 'Erro ao deletar agendamento';
        console.error(err);
        setTimeout(() => this.erro = '', 3000);
      }
    });
  }

  novoAgendamento() {
    this.router.navigate(['/novo-agendamento']);
  }

  podeAcoes(status: string): boolean {
    return status === 'agendado';
  }
}

