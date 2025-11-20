import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@app/environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((res) => {
          if (res && res.token) {
            // Store token
            sessionStorage.setItem('auth_token', res.token);

            // Decode token (extracting claims)
            const payload = JSON.parse(atob(res.token.split('.')[1]));

            // Store extracted values
            sessionStorage.setItem('username', payload.sub);
            sessionStorage.setItem('fullName', payload.fullName);
            sessionStorage.setItem('role', payload.role);
          }
        })
      );
  }

  register(username: string, password: string, fullName?: string) {
    return this.http.post<any>(`${this.baseUrl}/register`, {
      username,
      password,
      fullName,
    });
  }

logout() {
  sessionStorage.clear();
  localStorage.clear();
  document.cookie.split(";").forEach((c) => {
      document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  window.location.assign('/login');
}


  getToken(): string | null {
    return sessionStorage.getItem('auth_token');
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  getFullName(): string | null {
    return sessionStorage.getItem('fullName');
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('auth_token');
  }
}
