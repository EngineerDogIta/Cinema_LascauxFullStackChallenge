// src/app/core/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../api/services/authentication.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiAuth: AuthenticationService) {}

  login(credentials: { username: string; password: string }) {
    return this.apiAuth.authenticateUser({ body: credentials }).pipe(
      tap(response => {
        if(response.token) {
          localStorage.setItem('jwt_token', response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }

  getToken() {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}

