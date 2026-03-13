import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface Address {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000/api/addresses';

  addresses = signal<Address[]>([]);

  fetchAddresses(): Observable<any> {
    const token = this.authService.token();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      tap(res => {
        if (res.success) {
          this.addresses.set(res.data);
        }
      })
    );
  }

  addAddress(addressData: any): Observable<any> {
    const token = this.authService.token();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, addressData, { headers }).pipe(
      tap(res => {
        if (res.success) {
          this.fetchAddresses().subscribe();
        }
      })
    );
  }

  deleteAddress(id: string): Observable<any> {
    const token = this.authService.token();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
      tap(res => {
        if (res.success) {
          this.addresses.set(this.addresses().filter(a => a._id !== id));
        }
      })
    );
  }

  setDefault(id: string): Observable<any> {
    const token = this.authService.token();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/${id}/default`, {}, { headers }).pipe(
      tap(res => {
        if (res.success) {
          this.fetchAddresses().subscribe();
        }
      })
    );
  }
}
