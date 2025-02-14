import { Component } from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive],
  template: `
    <header>
      <h1>CinemaFE</h1>
      <nav>
        <ul>
          <li><a routerLink="/movies" routerLinkActive="active">Movies</a></li>
          <li><a routerLink="/schedules" routerLinkActive="active">Schedules</a></li>
          <li *ngIf="!authService.isLoggedIn()"><a routerLink="/login">Login</a></li>
          <li *ngIf="authService.isLoggedIn()"><a (click)="logout()">Logout</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      <p>&copy; 2025 CinemaFE</p>
    </footer>
  `,
  styles: [`
    header {
      background-color: #333;
      color: white;
      padding: 1rem;
    }
    nav ul {
      list-style-type: none;
      padding: 0;
    }
    nav ul li {
      display: inline;
      margin-right: 1rem;
    }
    nav a {
      color: white;
      text-decoration: none;
    }
    nav a.active {
      font-weight: bold;
    }
    main {
      padding: 2rem;
    }
    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1rem;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
    // Redirect to login page or home page after logout
  }
}
