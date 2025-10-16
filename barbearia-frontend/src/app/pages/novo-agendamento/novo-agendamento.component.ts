import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BarbeiroService, Barbeiro } from '../../core/services/barbeiro.service';
import { ServicoService, Servico } from '../../core/services/servico.service';
import { AgendamentoService } from '../../core/services/agendamento.service';

@Component({
  selector: 'app-novo-agendamento',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './novo-agendamento.component.html',
  styleUrls: ['./novo-agendamento.component.scss']
})
export class NovoAgendamentoComponent implements OnInit {
  barbeiros: Barbeiro[] = [];
  servicos: Servico[] = [];
  
  barbeiroId: number | null = null;
  servicoId: number | null = null;
  data = '';
  hora = '';
  observacoes = '';

  erro = '';
  sucesso = '';
  carregando = false;

  constructor(
    private barbeiroService: BarbeiroService,
    private servicoService: ServicoService,
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarBarbeiros();
    this.carregarServicos();
    this.setDataMinima();
  }

  setDataMinima() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    this.data = `${ano}-${mes}-${dia}`;
  }

  carregarBarbeiros() {
    this.barbeiroService.listar().subscribe({
      next: (response) => {
        this.barbeiros = response.barbeiros;
      },
      error: (err) => console.error('Erro ao carregar barbeiros:', err)
    });
  }

  carregarServicos() {
    this.servicoService.listar().subscribe({
      next: (response) => {
        this.servicos = response.servicos;
      },
      error: (err) => console.error('Erro ao carregar serviços:', err)
    });
  }

  getServicoSelecionado(): Servico | undefined {
    if (!this.servicoId) return undefined;
    return this.servicos.find(s => s.id === this.servicoId);
  }

  getBarbeiroSelecionado(): Barbeiro | undefined {
    if (!this.barbeiroId) return undefined;
    return this.barbeiros.find(b => b.id === this.barbeiroId);
  }

  agendar() {
    if (!this.barbeiroId || !this.servicoId || !this.data || !this.hora) {
      this.erro = 'Preencha todos os campos obrigatórios';
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.sucesso = '';

    const dataHora = `${this.data} ${this.hora}:00`;

    const agendamento = {
      barbeiro_id: this.barbeiroId,
      servico_id: this.servicoId,
      data_hora: dataHora,
      observacoes: this.observacoes
    };

    this.agendamentoService.criar(agendamento).subscribe({
      next: () => {
        this.sucesso = 'Agendamento criado com sucesso! Redirecionando...';
        setTimeout(() => {
          this.router.navigate(['/agendamentos']);
        }, 2000);
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.erro || 'Erro ao criar agendamento';
      }
    });
  }

  cancelar() {
    this.router.navigate(['/dashboard']);
  }
}

