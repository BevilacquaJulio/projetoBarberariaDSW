import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ServicoService, Servico } from '../../core/services/servico.service';
import { ImagemService } from '../../core/services/imagem.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  servicos: Servico[] = [];
  imagens: Array<{ id?: number; filename: string; url: string; servico_id?: number; titulo?: string; descricao?: string; preco?: number }> = [];
  // Mapas para associar imagens diretamente ao serviço e evitar fallback por índice
  imagensByServico: { [servicoId: number]: { id?: number; filename: string; url: string; servico_id?: number; titulo?: string; descricao?: string; preco?: number } } = {};
  imagensByFilename: { [filename: string]: { id?: number; filename: string; url: string; servico_id?: number; titulo?: string; descricao?: string; preco?: number } } = {};
  isAdmin: boolean = false;
  @ViewChild('galeria') galeriaRef!: ElementRef<HTMLDivElement>;
  // campos para upload com metadados
  selectedFile?: File;
  newTitulo: string = '';
  newDescricao: string = '';
  newPreco?: number;

  constructor(
    private servicoService: ServicoService,
    private imagemService: ImagemService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.carregarServicos();
    this.carregarImagens();
    this.verificarAdmin();
  }

  verificarAdmin() {
    // Usa o AuthService (centralizado) para verificar se é admin
    this.isAdmin = this.authService.isAdmin();

    // Atualiza dinamicamente quando o usuário muda (login/logout)
    this.authService.usuario$.subscribe(u => {
      this.isAdmin = !!u && this.authService.isAdmin();
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

  // Retorna uma imagem para um serviço baseado no índice (usa imagens carregadas como fonte)
  getServicoImage(index: number): string {
    // Primeiro, tente usar a imagem associada ao serviço (se o backend retornar imagem_filename)
    const servico = this.servicos && this.servicos[index];
    if (servico && (servico as any).imagem_filename) {
      return this.imagemService.getImagemUrl((servico as any).imagem_filename);
    }

    // Senão, tente usar imagem associada pelo servico_id (mapa)
    if (servico && this.imagensByServico && this.imagensByServico[servico.id]) {
      return this.imagensByServico[servico.id].url;
    }

    // fallback para asset local
    return 'assets/img/default-service.jpg';
  }

  carregarImagens() {
    this.imagemService.listarImagens().subscribe({
      next: (response) => {
        // response.imagens agora contém objetos com metadados
        // Prepara array de imagens com metadados e popula mapas de lookup
        this.imagens = response.imagens.map(img => ({
          id: img.id,
          filename: img.filename,
          servico_id: (img as any).servico_id,
          url: this.imagemService.getImagemUrl(img.filename),
          titulo: img.titulo,
          descricao: img.descricao,
          preco: img.preco
        }));

        this.imagensByServico = {};
        this.imagensByFilename = {};
        for (const img of this.imagens) {
          if (img.filename) this.imagensByFilename[img.filename] = img;
          if (img.servico_id) this.imagensByServico[Number(img.servico_id)] = img;
        }
      },
      error: (err) => console.error('Erro ao carregar imagens:', err)
    });
  }

  agendar(servicoNome?: string) {
    // Número do WhatsApp (formato: 5511990227689 - código do país + DDD + número)
    const whatsappNumber = '5511990227689';
    
    // Mensagem pré-formatada
    let mensagem = 'Olá! Gostaria de agendar um horário.';
    
    if (servicoNome) {
      mensagem = `Olá! Gostaria de agendar um horário para o serviço: ${servicoNome}.`;
    }
    
    // Codifica a mensagem para URL
    const mensagemEncoded = encodeURIComponent(mensagem);
    
    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensagemEncoded}`;
    
    // Abre o WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');
  }

  // Método para lidar com o upload de imagem
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      // se quiser fazer upload automático sem metadados, descomente abaixo:
      // this.enviarImagem();
    }
  }

  enviarImagem() {
    if (!this.selectedFile) return;
    const metadata: any = {};
    if (this.newTitulo) metadata.titulo = this.newTitulo;
    if (this.newDescricao) metadata.descricao = this.newDescricao;
    if (this.newPreco != null) metadata.preco = this.newPreco;
    // se futuramente houver seleção de serviço no form
    if ((this as any).selectedServicoId) metadata.servicoId = (this as any).selectedServicoId;

    this.imagemService.uploadImagem(this.selectedFile, metadata).subscribe({
      next: (response) => {
        const novaImagem = {
          filename: response.filename,
          url: this.imagemService.getImagemUrl(response.filename),
          servico_id: metadata.servicoId || undefined,
          titulo: metadata.titulo || '',
          descricao: metadata.descricao || '',
          preco: metadata.preco || undefined
        };
        this.imagens.unshift(novaImagem);
        // Atualiza mapas para evitar repetição por índice
        if (novaImagem.filename) this.imagensByFilename[novaImagem.filename] = novaImagem;
        if (novaImagem.servico_id) this.imagensByServico[novaImagem.servico_id] = novaImagem;
        // limpa campos
        this.selectedFile = undefined;
        this.newTitulo = '';
        this.newDescricao = '';
        this.newPreco = undefined;
      },
      error: (error) => console.error('Erro no upload da imagem:', error)
    });
  }

  // Método para obter a URL completa de uma imagem
  getImagemUrl(filename: string): string {
    return this.imagemService.getImagemUrl(filename);
  }

  // Retorna a descrição a ser mostrada no card do serviço.
  // Prioriza a descrição da imagem associada (imagem.descricao) se existir,
  // caso contrário retorna a descrição do próprio serviço.
  getServicoDescricao(index: number): string {
    const servico = this.servicos && this.servicos[index];
    if (!servico) return '';
    // Prefer metadata returned directly in servico (imagem_descricao)
    if ((servico as any).imagem_descricao) return (servico as any).imagem_descricao;

    const imagemFilename = (servico as any).imagem_filename;
    if (imagemFilename && this.imagens && this.imagens.length) {
      const img = this.imagens.find(i => i.filename === imagemFilename);
      if (img && img.descricao) return img.descricao as string;
    }

    return servico.descricao || '';
  }

  // Retorna o preço a ser mostrado no card do serviço.
  // Prioriza preco da imagem (imagem.preco) se estiver preenchido,
  // senão usa servico.preco.
  getServicoPreco(index: number): number | null {
    const servico = this.servicos && this.servicos[index];
    if (!servico) return null;
    // Prefer metadata returned directly in servico (imagem_preco)
    if ((servico as any).imagem_preco != null) return Number((servico as any).imagem_preco);

    const imagemFilename = (servico as any).imagem_filename;
    if (imagemFilename && this.imagens && this.imagens.length) {
      const img = this.imagens.find(i => i.filename === imagemFilename);
      if (img && img.preco != null) return img.preco as number;
    }

    return typeof servico.preco === 'number' ? servico.preco : Number(servico.preco) || null;
  }

  // Controle de scroll para a galeria (botões)
  scrollGaleria(direction: 'left' | 'right') {
    const el = this.galeriaRef?.nativeElement;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.7; // rola ~70% da largura visível
    if (direction === 'left') {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
