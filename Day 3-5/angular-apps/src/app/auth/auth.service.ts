import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://reqres.in/api/login';
  private apiKey = 'reqres-free-v1';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'x-api-key': this.apiKey });
    return this.http
      .post<{ token: string }>(this.apiUrl, { email, password }, { headers })
      .pipe(
        tap((res) => {
          if (res.token) {
            localStorage.setItem(this.tokenKey, res.token);
          }
        }),
        map((res) => !!res.token),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
