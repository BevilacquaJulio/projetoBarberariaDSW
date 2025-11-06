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
    public authService: AuthService,
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.authService.getUsuario();
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    // Se for admin, busca todos os agendamentos
    const isAdmin = this.authService.isAdmin() || this.usuario?.role === 'administrador';
    
    const request = isAdmin 
      ? this.agendamentoService.listarTodos()
      : this.agendamentoService.listarMeus();
    
    request.subscribe({
      next: (response) => {
        console.log('Agendamentos recebidos do backend:', response);
        this.agendamentos = response.agendamentos || [];
        console.log('Total de agendamentos:', this.agendamentos.length);
        console.log('Agendamentos:', this.agendamentos);
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
    console.log('Filtrando agendamentos próximos...');
    console.log('Total de agendamentos para filtrar:', this.agendamentos.length);
    
    if (this.agendamentos.length === 0) {
      console.warn('Nenhum agendamento recebido do backend!');
      this.agendamentosProximos = [];
      return;
    }
    
    const agora = new Date();
    agora.setSeconds(0, 0);
    agora.setMilliseconds(0);
    
    console.log('Data/hora atual:', agora.toISOString());
    
    // Filtra apenas por status 'agendado' primeiro (sem verificar data)
    const agendados = this.agendamentos.filter(a => {
      if (!a.status) return false;
      const statusNormalizado = (a.status || '').toLowerCase().trim();
      return statusNormalizado === 'agendado';
    });
    
    console.log('Agendamentos com status "agendado":', agendados.length);
    
    // Agora filtra por data futura
    this.agendamentosProximos = agendados
      .filter(a => {
        if (!a.data_hora) {
          console.warn('Agendamento sem data_hora:', a);
          return false;
        }
        
        // Tenta parsear a data de diferentes formatos
        let dataAgendamento: Date;
        try {
          // O backend retorna no formato: "YYYY-MM-DD HH:MM:SS"
          const dataFormatada = a.data_hora.replace(' ', 'T');
          dataAgendamento = new Date(dataFormatada);
          
          // Se o parse falhou, tenta outro formato
          if (isNaN(dataAgendamento.getTime())) {
            dataAgendamento = new Date(a.data_hora);
          }
          
          if (isNaN(dataAgendamento.getTime())) {
            console.error('Não foi possível parsear a data:', a.data_hora);
            return false;
          }
        } catch (e) {
          console.error('Erro ao parsear data:', e, a.data_hora);
          return false;
        }
        
        dataAgendamento.setSeconds(0, 0);
        dataAgendamento.setMilliseconds(0);
        
        const isFuturo = dataAgendamento.getTime() > agora.getTime();
        
        console.log(`Agendamento ${a.id}:`, {
          data_hora_original: a.data_hora,
          data_parseada: dataAgendamento.toISOString(),
          agora: agora.toISOString(),
          isFuturo: isFuturo,
          status: a.status
        });
        
        return isFuturo;
      })
      .sort((a, b) => {
        try {
          const dataA = new Date(a.data_hora.replace(' ', 'T')).getTime();
          const dataB = new Date(b.data_hora.replace(' ', 'T')).getTime();
          return dataA - dataB;
        } catch {
          return 0;
        }
      })
      .slice(0, 3);
    
    console.log('Agendamentos próximos encontrados:', this.agendamentosProximos.length);
    console.log('Agendamentos próximos:', this.agendamentosProximos);
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

  getAgendamentosConcluidos(): number {
    return this.agendamentos.filter(a => a.status === 'concluido').length;
  }

  getAgendamentosAgendados(): number {
    return this.agendamentos.filter(a => a.status === 'agendado').length;
  }

  novoAgendamento() {
    this.router.navigate(['/novo-agendamento']);
  }

  verTodos() {
    this.router.navigate(['/agendamentos']);
  }

  formatarPreco(preco: number | string | undefined): string {
    if (!preco) return '0,00';
    
    // Converte para número se for string
    const valor = typeof preco === 'string' ? parseFloat(preco) : preco;
    
    if (isNaN(valor)) return '0,00';
    
    return valor.toFixed(2).replace('.', ',');
  }

  abrirWhatsApp(agendamento: Agendamento) {
    if (!agendamento.usuario_telefone) return;
    
    // Remove caracteres não numéricos
    const telefone = agendamento.usuario_telefone.replace(/\D/g, '');
    const mensagem = `Olá ${agendamento.usuario_nome || 'cliente'}! Gostaria de confirmar seu agendamento para ${this.formatarData(agendamento.data_hora)}.`;
    const whatsappUrl = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  }

  abrirEmail(agendamento: Agendamento) {
    if (!agendamento.usuario_email) return;
    
    const assunto = `Confirmação de Agendamento - ${agendamento.servico_nome}`;
    const corpo = `Olá ${agendamento.usuario_nome || 'cliente'},\n\nGostaria de confirmar seu agendamento:\n\nServiço: ${agendamento.servico_nome}\nData/Hora: ${this.formatarData(agendamento.data_hora)}\nValor: R$ ${this.formatarPreco(agendamento.servico_preco)}\n\nAguardo sua confirmação.\n\nAtenciosamente.`;
    const mailtoUrl = `mailto:${agendamento.usuario_email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.location.href = mailtoUrl;
  }
}

