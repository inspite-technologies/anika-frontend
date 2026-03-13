import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000/api/wishlist';

  items = signal<WishlistItem[]>([]);
  totalItems = computed(() => this.items().length);

  constructor() {
    // We'll fetch wishlist when user is logged in
  }

  getWishlist(): Observable<any> {
    const token = this.authService.token();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      tap(res => {
        if (res.success) {
          this.items.set(res.data);
        }
      })
    );
  }

  addToWishlist(productId: string): Observable<any> {
    const token = this.authService.token();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/${productId}`, {}, { headers }).pipe(
      tap(res => {
        if (res.success) {
          this.getWishlist().subscribe();
        }
      })
    );
  }

  removeFromWishlist(productId: string): Observable<any> {
    const token = this.authService.token();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${productId}`, { headers }).pipe(
      tap(res => {
        if (res.success) {
          this.items.set(this.items().filter(item => item._id !== productId));
        }
      })
    );
  }

  isInWishlist(productId: string): boolean {
    return this.items().some(item => item._id === productId);
  }

  clearWishlist() {
    this.items.set([]);
  }
}
