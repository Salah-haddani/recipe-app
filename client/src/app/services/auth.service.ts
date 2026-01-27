import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(credentials: any) {
    return this.http
      .post(`${this.apiUrl}/register`, credentials)
      .pipe(tap((res: any) => this.setSession(res.access_token)));
  }

  login(credentials: any) {
    return this.http
      .post(`${this.apiUrl}/login`, credentials)
      .pipe(tap((res: any) => this.setSession(res.access_token)));
  }

  private setSession(token: string) {
    localStorage.setItem('access_token', token);
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
