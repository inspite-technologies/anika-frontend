import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    quantity: number; // Added stock quantity
    specifications?: { key: string; value: string }[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/cart';
    private cartItems = signal<CartItem[]>([]);
    private sessionId: string;

    constructor() {
        this.sessionId = localStorage.getItem('cartSessionId') || this.generateSessionId();
        localStorage.setItem('cartSessionId', this.sessionId);
        this.fetchCart();
    }

    private generateSessionId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private fetchCart() {
        this.http.get<any>(`${this.apiUrl}/${this.sessionId}`).subscribe({
            next: (res) => {
                if (res.success && res.data.items) {
                    const items = res.data.items
                        .filter((item: any) => item.product != null)
                        .map((item: any) => ({
                            product: { ...item.product, id: item.product._id },
                            quantity: item.quantity
                        }));
                    this.cartItems.set(items);
                }
            },
            error: (err) => console.error('Error fetching cart:', err)
        });
    }

    // Computed values for total items and price
    totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
    totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));
    items = computed(() => this.cartItems());

    addToCart(product: Product, quantity: number = 1) {
        this.http.post<any>(this.apiUrl, {
            sessionId: this.sessionId,
            productId: product.id,
            quantity: quantity
        }).subscribe({
            next: (res) => {
                if (res.success) {
                    const items = res.data.items
                        .filter((item: any) => item.product != null)
                        .map((item: any) => ({
                            product: { ...item.product, id: item.product._id },
                            quantity: item.quantity
                        }));
                    this.cartItems.set(items);
                }
            },
            error: (err) => {
                console.error('Error adding to cart:', err);
                if (err.status === 400 && err.error?.message) {
                    alert(err.error.message);
                }
            }
        });
    }

    updateQuantity(productId: string, delta: number) {
        this.http.post<any>(this.apiUrl, {
            sessionId: this.sessionId,
            productId: productId,
            quantity: delta
        }).subscribe({
            next: (res) => {
                if (res.success) {
                    const items = res.data.items
                        .filter((item: any) => item.product != null)
                        .map((item: any) => ({
                            product: { ...item.product, id: item.product._id },
                            quantity: item.quantity
                        }));
                    this.cartItems.set(items);
                }
            },
            error: (err) => {
                console.error('Error updating quantity:', err);
                if (err.status === 400 && err.error?.message) {
                    alert(err.error.message);
                }
            }
        });
    }

    removeFromCart(productId: string) {
        // To remove, we can send a very large negative delta or a special flag.
        // For simplicity with the current controller, let's find current quantity and send -qty
        const item = this.cartItems().find(i => i.product.id === productId);
        if (item) {
            this.updateQuantity(productId, -item.quantity);
        }
    }

    clearCart() {
        this.http.delete<any>(`${this.apiUrl}/${this.sessionId}`).subscribe({
            next: (res) => {
                if (res.success) {
                    this.cartItems.set([]);
                }
            },
            error: (err) => console.error('Error clearing cart:', err)
        });
    }
}
