import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface OrderItem {
  product: any;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  state: string;
  items: OrderItem[];
  amount: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000/api/orders';

  getOrdersByEmail(email: string): Observable<any> {
    const token = this.authService.token();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(`${this.apiUrl}/my-orders`, { headers });
    }
    return this.http.get<any>(`${this.apiUrl}?email=${email}`);
  }

  getOrderDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
