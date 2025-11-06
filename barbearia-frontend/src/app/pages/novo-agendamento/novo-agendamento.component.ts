import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BarbeiroService, Barbeiro } from '../../core/services/barbeiro.service';
import { ServicoService, Servico } from '../../core/services/servico.service';
import { AgendamentoService } from '../../core/services/agendamento.service';
import { ClienteService, Cliente } from '../../core/services/cliente.service';
import { AuthService } from '../../core/services/auth.service';

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
  clientes: Cliente[] = [];
  
  barbeiroId: number | null = null;
  servicoId: number | null = null;
  clienteId: number | null = null;
  data = '';
  dataMinima = '';
  hora = '';
  observacoes = '';

  // Campos para criar novo cliente
  novoClienteNome = '';
  novoClienteTelefone = '';
  novoClienteEmail = '';
  novoClienteDataNascimento = '';
  novoClienteEndereco = '';
  criarNovoCliente = false;

  erro = '';
  sucesso = '';
  sucessoCliente = false;
  carregando = false;
  carregandoCliente = false;

  // Modal de seleção de clientes
  modalClienteAberto = false;
  buscaCliente = '';
  clienteSelecionado: Cliente | null = null;

  constructor(
    private barbeiroService: BarbeiroService,
    private servicoService: ServicoService,
    private agendamentoService: AgendamentoService,
    private clienteService: ClienteService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarBarbeiros();
    this.carregarServicos();
    this.setDataMinima();
    
    // Se for admin, carrega lista de clientes
    if (this.authService.isAdmin()) {
      this.carregarClientes();
    }
  }

  setDataMinima() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    this.dataMinima = `${ano}-${mes}-${dia}`;
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

  carregarClientes() {
    this.clienteService.listar().subscribe({
      next: (response) => {
        this.clientes = response.usuarios || [];
        // Se já tinha um cliente selecionado, atualiza o objeto
        if (this.clienteId) {
          this.clienteSelecionado = this.clientes.find(c => c.id === this.clienteId) || null;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        if (err.status === 403) {
          this.erro = 'Acesso negado. Você precisa ser administrador para listar clientes.';
        } else if (err.status === 401) {
          this.erro = 'Sessão expirada. Por favor, faça login novamente.';
        } else {
          this.erro = 'Erro ao carregar lista de clientes. Tente novamente mais tarde.';
        }
      }
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

  getClientesFiltrados(): Cliente[] {
    if (!this.buscaCliente.trim()) {
      return this.clientes;
    }
    const busca = this.buscaCliente.toLowerCase().trim();
    return this.clientes.filter(cliente => 
      cliente.nome.toLowerCase().includes(busca) ||
      cliente.telefone?.toLowerCase().includes(busca) ||
      cliente.email?.toLowerCase().includes(busca)
    );
  }

  abrirModalCliente() {
    this.modalClienteAberto = true;
    this.buscaCliente = '';
    document.body.style.overflow = 'hidden'; // Previne scroll do body quando modal está aberto
  }

  fecharModalCliente() {
    this.modalClienteAberto = false;
    this.buscaCliente = '';
    document.body.style.overflow = ''; // Restaura scroll do body
  }

  selecionarCliente(cliente: Cliente) {
    this.clienteId = cliente.id;
    this.clienteSelecionado = cliente;
    this.fecharModalCliente();
  }

  getClienteSelecionadoNome(): string {
    if (!this.clienteId || !this.clienteSelecionado) {
      return 'Selecione um cliente';
    }
    const cliente = this.clientes.find(c => c.id === this.clienteId);
    if (cliente) {
      return `${cliente.nome} - ${cliente.telefone}`;
    }
    return 'Cliente selecionado';
  }

  criarNovoClienteEAgendar() {
    if (!this.novoClienteNome.trim() || !this.novoClienteTelefone.trim()) {
      this.erro = 'Nome e telefone são obrigatórios para criar novo cliente';
      this.sucessoCliente = false;
      return;
    }

    this.carregandoCliente = true;
    this.erro = '';
    this.sucessoCliente = false;

    const novoCliente = {
      nome: this.novoClienteNome.trim(),
      telefone: this.novoClienteTelefone.trim(),
      email: this.novoClienteEmail.trim() || undefined,
      data_nascimento: this.novoClienteDataNascimento || undefined,
      endereco: this.novoClienteEndereco.trim() || undefined
    };

    this.clienteService.criar(novoCliente).subscribe({
      next: (response) => {
        this.clienteId = response.novoId;
        this.carregandoCliente = false;
        this.sucessoCliente = true;
        this.erro = '';
        
        // Recarrega lista e seleciona o cliente recém-criado
        this.clienteService.listar().subscribe({
          next: (listaResponse) => {
            this.clientes = listaResponse.usuarios || [];
            // Seleciona o cliente recém-criado automaticamente
            this.clienteId = response.novoId;
            const clienteCriado = this.clientes.find(c => c.id === response.novoId);
            if (clienteCriado) {
              this.clienteSelecionado = clienteCriado;
            }
            
            // Muda para "Cliente existente" e mostra o cliente selecionado
            setTimeout(() => {
              this.criarNovoCliente = false;
              // Aguarda um pouco antes de criar o agendamento para mostrar o feedback
              setTimeout(() => {
                this.agendar();
              }, 1000);
            }, 500);
          },
          error: () => {
            // Mesmo se falhar ao recarregar, continua com o agendamento
            setTimeout(() => {
              this.agendar();
            }, 1000);
          }
        });
      },
      error: (err) => {
        this.carregandoCliente = false;
        this.sucessoCliente = false;
        if (err.status === 400 && err.error?.erro?.includes('Telefone')) {
          this.erro = 'Este telefone já está cadastrado. Por favor, selecione o cliente existente ou use outro telefone.';
        } else {
          this.erro = err.error?.erro || 'Erro ao criar cliente. Verifique os dados e tente novamente.';
        }
      }
    });
  }

  agendar() {
    if (!this.barbeiroId || !this.servicoId || !this.data || !this.hora) {
      this.erro = 'Preencha todos os campos obrigatórios';
      return;
    }

    // Se for admin e está criando novo cliente, chama função específica
    if (this.authService.isAdmin() && this.criarNovoCliente) {
      this.criarNovoClienteEAgendar();
      return;
    }

    // Se for admin, valida se selecionou um cliente
    if (this.authService.isAdmin()) {
      if (!this.criarNovoCliente && !this.clienteId) {
        this.erro = 'Selecione um cliente ou crie um novo';
        return;
      }
    }

    this.carregando = true;
    this.erro = '';
    this.sucesso = '';

    const dataHora = `${this.data} ${this.hora}:00`;

    const agendamento: any = {
      barbeiro_id: this.barbeiroId,
      servico_id: this.servicoId,
      data_hora: dataHora,
      observacoes: this.observacoes
    };

    // Se for admin e selecionou um cliente, inclui cliente_id
    if (this.authService.isAdmin() && this.clienteId) {
      agendamento.cliente_id = this.clienteId;
    }

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

  formatarPreco(preco: number | string | undefined): string {
    if (!preco) return '0,00';
    
    // Converte para número se for string
    const valor = typeof preco === 'string' ? parseFloat(preco) : preco;
    
    if (isNaN(valor)) return '0,00';
    
    return valor.toFixed(2).replace('.', ',');
  }
}

