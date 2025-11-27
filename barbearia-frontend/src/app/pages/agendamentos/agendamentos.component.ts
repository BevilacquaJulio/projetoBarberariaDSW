import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  agendamentosConcluidos: Agendamento[] = [];
  agendamentosAgendados: Agendamento[] = [];
  agendamentosAtrasados: Agendamento[] = [];
  agendamentosCancelados: Agendamento[] = [];
  agendamentosVisiveis: Agendamento[] = [];
  carregando = true;
  erro = '';
  sucesso = '';
  selectedTab: AbaAgendamento = 'concluidos';
  private focusDestino: AbaAgendamento | null = null;

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const focus = params.get('focus') as AbaAgendamento | null;
      if (focus && this.selectedTab !== focus) {
        this.focusDestino = focus;
        this.selectedTab = focus;
        this.atualizarAgendamentosVisiveis();
        this.scrollParaLista();
      }
    });
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.carregando = true;
    this.erro = '';
    
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
        this.atualizarListasFiltradas();
        this.verificarFocusDestino();
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
    
    let data: Date;
    try {
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

  getStatusClass(agendamento: Agendamento): string {
    if (this.isAtrasado(agendamento)) {
      return 'status-atrasado';
    }

    const status = (agendamento.status || '').toLowerCase();
    const classes: Record<string, string> = {
      'agendado': 'status-agendado',
      'em_andamento': 'status-andamento',
      'concluido': 'status-concluido',
      'cancelado': 'status-cancelado',
      'atrasado': 'status-atrasado'
    };

    return classes[status] || '';
  }

  getStatusLabel(agendamento: Agendamento): string {
    if (this.isAtrasado(agendamento)) {
      return 'Atrasado';
    }

    const status = (agendamento.status || '').toLowerCase();
    const labels: Record<string, string> = {
      'agendado': 'Agendado',
      'em_andamento': 'Em Andamento',
      'concluido': 'Concluído',
      'cancelado': 'Cancelado',
      'atrasado': 'Atrasado'
    };

    return labels[status] || (agendamento.status || '');
  }

  private isAtrasado(agendamento: Agendamento): boolean {
    if (!agendamento?.data_hora) return false;

    const status = (agendamento.status || '').toLowerCase();
    if (status === 'atrasado') return true;

    let dataAgendamento = agendamento.data_hora;
    if (dataAgendamento.includes(' ')) {
      dataAgendamento = dataAgendamento.replace(' ', 'T');
    }

    const data = new Date(dataAgendamento);
    if (isNaN(data.getTime())) return false;

    const agora = new Date();
    const statusElegivel = status === 'agendado' || status === 'em_andamento';
    const umaHoraMs = 60 * 60 * 1000;
    return statusElegivel && (data.getTime() + umaHoraMs) < agora.getTime();
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

  concluirAgendamento(id: number | undefined) {
    if (!id) return;

    this.agendamentoService.alterarStatus(id, 'concluido').subscribe({
      next: () => {
        this.sucesso = 'Agendamento marcado como concluído!';
        this.carregarAgendamentos();
        setTimeout(() => this.sucesso = '', 3000);
      },
      error: (err) => {
        this.erro = 'Erro ao concluir agendamento';
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
    return status === 'agendado';
  }

  podeDeletar(status: string): boolean {
    const isAdmin = this.authService.isAdmin();
    const usuario = this.authService.getUsuario();
    const isAdminUser = isAdmin || usuario?.role === 'administrador';
    
    return isAdminUser || status === 'agendado';
  }

  podeConcluir(status: string): boolean {
    const statusNormalizado = status?.toLowerCase();
    return statusNormalizado === 'agendado' || statusNormalizado === 'em_andamento';
  }

  setTab(tab: AbaAgendamento) {
    if (this.selectedTab === tab) return;
    this.selectedTab = tab;
    this.atualizarAgendamentosVisiveis();
    this.scrollParaLista();
  }

  private getAgendamentosFiltrados(): Agendamento[] {
    switch (this.selectedTab) {
      case 'agendados':
        return this.agendamentosAgendados;
      case 'atrasados':
        return this.agendamentosAtrasados;
      case 'concluidos':
        return this.agendamentosConcluidos;
      case 'cancelados':
        return this.agendamentosCancelados;
      default:
        return this.agendamentosAgendados;
    }
  }

  private scrollParaLista() {
    const listContainer = document.getElementById('agendamentos-list-container');
    if (listContainer) {
      listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private atualizarListasFiltradas() {
    this.agendamentosConcluidos = this.agendamentos.filter(
      a => (a.status || '').toLowerCase() === 'concluido'
    );

    this.agendamentosAgendados = this.agendamentos.filter(a => {
      const status = (a.status || '').toLowerCase();
      return status === 'agendado' || status === 'em_andamento';
    });

    this.agendamentosAtrasados = this.agendamentos.filter(a => this.isAtrasado(a));

    this.agendamentosCancelados = this.agendamentos.filter(
      a => (a.status || '').toLowerCase() === 'cancelado'
    );

    this.atualizarAgendamentosVisiveis();
  }

  private atualizarAgendamentosVisiveis() {
    this.agendamentosVisiveis = this.getAgendamentosFiltrados();
  }

  private verificarFocusDestino() {
    if (this.focusDestino && this.getAgendamentosFiltrados().length) {
      setTimeout(() => this.scrollParaLista(), 150);
      this.focusDestino = null;
    }
  }

  formatarPreco(preco: number | string | undefined): string {
    if (!preco) return '0,00';
    
    const valor = typeof preco === 'string' ? parseFloat(preco) : preco;
    
    if (isNaN(valor)) return '0,00';
    
    return valor.toFixed(2).replace('.', ',');
  }
}

type AbaAgendamento = 'agendados' | 'atrasados' | 'concluidos' | 'cancelados';

