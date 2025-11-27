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
  imagensByServico: { [servicoId: number]: { id?: number; filename: string; url: string; servico_id?: number; titulo?: string; descricao?: string; preco?: number } } = {};
  imagensByFilename: { [filename: string]: { id?: number; filename: string; url: string; servico_id?: number; titulo?: string; descricao?: string; preco?: number } } = {};
  isAdmin: boolean = false;
  @ViewChild('galeria') galeriaRef!: ElementRef<HTMLDivElement>;
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
    this.isAdmin = this.authService.isAdmin();
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

  getServicoImage(index: number): string {
    const servico = this.servicos && this.servicos[index];
    if (servico && (servico as any).imagem_filename) {
      return this.imagemService.getImagemUrl((servico as any).imagem_filename);
    }

    if (servico && this.imagensByServico && this.imagensByServico[servico.id]) {
      return this.imagensByServico[servico.id].url;
    }

    return 'assets/img/default-service.jpg';
  }

  carregarImagens() {
    this.imagemService.listarImagens().subscribe({
      next: (response) => {
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
    const whatsappNumber = '5511990227689';
    let mensagem = 'Olá! Gostaria de agendar um horário.';
    
    if (servicoNome) {
      mensagem = `Olá! Gostaria de agendar um horário para o serviço: ${servicoNome}.`;
    }
    
    const mensagemEncoded = encodeURIComponent(mensagem);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensagemEncoded}`;
    window.open(whatsappUrl, '_blank');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  enviarImagem() {
    if (!this.selectedFile) return;
    const metadata: any = {};
    if (this.newTitulo) metadata.titulo = this.newTitulo;
    if (this.newDescricao) metadata.descricao = this.newDescricao;
    if (this.newPreco != null) metadata.preco = this.newPreco;
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
        if (novaImagem.filename) this.imagensByFilename[novaImagem.filename] = novaImagem;
        if (novaImagem.servico_id) this.imagensByServico[novaImagem.servico_id] = novaImagem;
        this.selectedFile = undefined;
        this.newTitulo = '';
        this.newDescricao = '';
        this.newPreco = undefined;
      },
      error: (error) => console.error('Erro no upload da imagem:', error)
    });
  }

  getImagemUrl(filename: string): string {
    return this.imagemService.getImagemUrl(filename);
  }

  getServicoDescricao(index: number): string {
    const servico = this.servicos && this.servicos[index];
    if (!servico) return '';
    if ((servico as any).imagem_descricao) return (servico as any).imagem_descricao;

    const imagemFilename = (servico as any).imagem_filename;
    if (imagemFilename && this.imagens && this.imagens.length) {
      const img = this.imagens.find(i => i.filename === imagemFilename);
      if (img && img.descricao) return img.descricao as string;
    }

    return servico.descricao || '';
  }

  getServicoPreco(index: number): number | null {
    const servico = this.servicos && this.servicos[index];
    if (!servico) return null;
    if ((servico as any).imagem_preco != null) return Number((servico as any).imagem_preco);

    const imagemFilename = (servico as any).imagem_filename;
    if (imagemFilename && this.imagens && this.imagens.length) {
      const img = this.imagens.find(i => i.filename === imagemFilename);
      if (img && img.preco != null) return img.preco as number;
    }

    return typeof servico.preco === 'number' ? servico.preco : Number(servico.preco) || null;
  }

  scrollGaleria(direction: 'left' | 'right') {
    const el = this.galeriaRef?.nativeElement;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.7;
    if (direction === 'left') {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
