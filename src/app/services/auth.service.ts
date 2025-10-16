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
            localStorage.setItem('auth_token', res.token);
            localStorage.setItem('username', res.username);
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
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
     window.location.href = '/login';
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
   

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  isLoggedIn(): boolean {
  const token = localStorage.getItem('auth_token');
  return !!token; // returns true if token exists
}
}
