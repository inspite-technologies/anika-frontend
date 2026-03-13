import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';
  
  currentUser = signal<User | null>(null);
  token = signal<string | null>(localStorage.getItem('token'));

  constructor() {
    if (this.token()) {
      this.fetchProfile().subscribe();
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  verifyOTP(email: string, otp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, { email, otp });
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.token.set(res.token);
          this.currentUser.set(res.data);
        }
      })
    );
  }

  fetchProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${this.token()}` }
    }).pipe(
      tap(res => {
        if (res.success) {
          this.currentUser.set(res.data);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!this.token();
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, data);
  }

  sendChangePasswordOTP(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password-otp`, {}, {
      headers: { Authorization: `Bearer ${this.token()}` }
    });
  }

  changePassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, data, {
      headers: { Authorization: `Bearer ${this.token()}` }
    });
  }
}
