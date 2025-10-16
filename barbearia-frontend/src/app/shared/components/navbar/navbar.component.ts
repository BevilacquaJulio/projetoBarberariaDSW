import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, Usuario } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario: Usuario | null = null;
  menuAberto = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.usuario$.subscribe(user => {
      this.usuario = user;
    });
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  logout() {
    this.authService.logout();
    this.menuAberto = false;
  }
}

