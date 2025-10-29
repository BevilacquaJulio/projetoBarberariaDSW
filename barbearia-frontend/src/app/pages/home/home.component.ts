import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ServicoService, Servico } from '../../core/services/servico.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  servicos: Servico[] = [];

  constructor(
    private servicoService: ServicoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarServicos();
  }

  carregarServicos() {
    this.servicoService.listar().subscribe({
      next: (response) => {
        this.servicos = response.servicos;
      },
      error: (err) => console.error('Erro ao carregar serviços:', err)
    });
  }

  agendar() {
    this.router.navigate(['/login']);
  }
}

