import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AgendamentoService, Agendamento } from '../../core/services/agendamento.service';
import { AuthService } from '../../core/services/auth.service';

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
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.carregando = true;
    this.erro = '';
    
    // Se for admin, busca todos os agendamentos
    const isAdmin = this.authService.isAdmin();
    const usuario = this.authService.getUsuario();
    const isAdminUser = isAdmin || usuario?.role === 'administrador';
    
    const request = isAdminUser 
      ? this.agendamentoService.listarTodos()
      : this.agendamentoService.listarMeus();
    
    request.subscribe({
      next: (response) => {
        console.log('Agendamentos recebidos (página agendamentos):', response);
        this.agendamentos = response.agendamentos || [];
        console.log('Total de agendamentos carregados:', this.agendamentos.length);
        this.carregando = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar agendamentos';
        this.carregando = false;
        console.error('Erro ao carregar agendamentos:', err);
      }
    });
  }

  formatarData(dataHora: string): string {
    if (!dataHora) return '';
    
    // Tenta parsear a data de diferentes formatos
    let data: Date;
    try {
      // Backend retorna: "YYYY-MM-DD HH:MM:SS"
      const dataFormatada = dataHora.replace(' ', 'T');
      data = new Date(dataFormatada);
      
      if (isNaN(data.getTime())) {
        data = new Date(dataHora);
      }
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return dataHora;
    }
    
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

  podeCancelar(status: string): boolean {
    // Apenas agendamentos com status 'agendado' podem ser cancelados
    return status === 'agendado';
  }

  podeDeletar(status: string): boolean {
    // Admin pode deletar qualquer agendamento, clientes apenas os 'agendado'
    const isAdmin = this.authService.isAdmin();
    const usuario = this.authService.getUsuario();
    const isAdminUser = isAdmin || usuario?.role === 'administrador';
    
    return isAdminUser || status === 'agendado';
  }

  formatarPreco(preco: number | string | undefined): string {
    if (!preco) return '0,00';
    
    // Converte para número se for string
    const valor = typeof preco === 'string' ? parseFloat(preco) : preco;
    
    if (isNaN(valor)) return '0,00';
    
    return valor.toFixed(2).replace('.', ',');
  }
}

