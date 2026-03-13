import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { AddressService, Address } from '../../services/address.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <main class="cart-page">
      <section class="page-header small">
        <div class="container">
          <h1>Your Shopping Cart</h1>
          <p>Review your selected products and proceed to checkout.</p>
        </div>
      </section>

      <section class="section-padding">
        <div class="container">
          <div class="cart-container" *ngIf="cartService.items().length > 0; else emptyCart">
            <div class="cart-items">
              <div class="cart-item" *ngFor="let item of cartService.items()">
                <div class="item-img"><img [src]="item.product.image" [alt]="item.product.name"></div>
                <div class="item-info">
                  <span class="item-cat">{{item.product.category}}</span>
                  <h3>{{item.product.name}}</h3>
                  <p class="item-price">₹{{item.product.price}}</p>
                </div>
                <div class="item-qty">
                  <button (click)="cartService.updateQuantity(item.product.id, -1)"><i class="fas fa-minus"></i></button>
                  <span>{{item.quantity}}</span>
                  <button (click)="cartService.updateQuantity(item.product.id, 1)" [disabled]="item.quantity >= item.product.quantity" [class.opacity-30]="item.quantity >= item.product.quantity">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div class="item-total">
                  ₹{{item.product.price * item.quantity}}
                </div>
                <button class="remove-btn" (click)="cartService.removeFromCart(item.product.id)"><i class="fas fa-trash"></i></button>
              </div>
            </div>

            <div class="cart-summary">
              <div class="summary-card">
                <h3>Order Summary</h3>
                <div class="summary-row">
                  <span>Subtotal</span>
                  <span>₹{{cartService.totalPrice()}}</span>
                </div>
                <div class="summary-row">
                  <span>Shipping</span>
                  <span class="free">Calculated at inquiry</span>
                </div>
                <div class="summary-total">
                  <span>Total (Approx)</span>
                  <span>₹{{cartService.totalPrice()}}</span>
                </div>
                
                <button class="btn btn-primary btn-block" (click)="showCheckoutForm.set(true)">
                  Proceed to Checkout <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Checkout Form Section (Conditional) -->
          <div class="checkout-overlay" *ngIf="showCheckoutForm()">
            <div class="checkout-card">
              <div class="checkout-header">
                <h3>Delivery Information</h3>
                <button class="close-btn" (click)="showCheckoutForm.set(false)"><i class="fas fa-times"></i></button>
              </div>
              <p class="checkout-desc">Please provide your details to receive a finalized quotation.</p>
              
              <!-- Address Selection Section -->
              <div class="address-selector" *ngIf="isLoggedIn() && addressService.addresses().length > 0">
                <p class="subtitle">Select Delivery Address</p>
                <div class="address-chips">
                  <div class="address-chip" 
                       *ngFor="let addr of addressService.addresses()" 
                       [class.active]="selectedAddressId() === addr._id"
                       (click)="selectSavedAddress(addr)">
                    <div class="chip-header">
                      <span class="chip-name">{{addr.fullName}}</span>
                      <span class="chip-badge" *ngIf="addr.isDefault">Default</span>
                    </div>
                    <p class="chip-text">{{addr.address.substring(0, 30)}}...</p>
                  </div>
                  <div class="address-chip add-new" 
                       [class.active]="selectedAddressId() === 'new'"
                       (click)="useNewAddress()">
                    <i class="fas fa-plus"></i>
                    <span>Use New Address</span>
                  </div>
                </div>
              </div>

              <div class="checkout-form-grid">
                <div class="form-group">
                  <label>Full Name</label>
                  <input type="text" name="customerName" [(ngModel)]="checkoutData.customerName" placeholder="Enter your full name" required>
                </div>
                <div class="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" [(ngModel)]="checkoutData.email" placeholder="email@example.com" required>
                </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" [(ngModel)]="checkoutData.phone" placeholder="+91 00000 00000" required>
                </div>
                <div class="form-group">
                  <label>State</label>
                  <input type="text" name="state" [(ngModel)]="checkoutData.state" placeholder="e.g. Maharashtra" required>
                </div>
                <div class="form-group">
                  <label>Pincode</label>
                  <input type="text" name="pincode" [(ngModel)]="checkoutData.pincode" placeholder="6-digit code" required>
                </div>
                <div class="form-group full-width">
                  <label>Full Delivery Address</label>
                  <textarea name="address" [(ngModel)]="checkoutData.address" [readonly]="isLoggedIn() && selectedAddressId() !== 'new'" placeholder="Building, Street, Area..." rows="3" required></textarea>
                </div>
              </div>

              <div class="checkout-actions">
                <button class="btn btn-outline" (click)="showCheckoutForm.set(false)" [disabled]="isProcessing()">Cancel</button>
                <button class="btn btn-primary" (click)="placeOrder()" [disabled]="isProcessing()">
                  <span *ngIf="!isProcessing()">Confirm Inquiry <i class="fas fa-check"></i></span>
                  <span *ngIf="isProcessing()">Processing...</span>
                </button>
              </div>
            </div>
          </div>

          <ng-template #emptyCart>
            <div class="empty-state">
              <i class="fas fa-shopping-cart"></i>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any clinical diagnostic products yet.</p>
              <a routerLink="/products" class="btn btn-primary">Start Shopping</a>
            </div>
          </ng-template>
        </div>
      </section>
    </main>

    <div class="order-success" *ngIf="orderPlaced()">
      <div class="success-card">
        <i class="fas fa-check-circle"></i>
        <h2>Inquiry Received!</h2>
        <p>Thank you for choosing Anika Health Care. Our representative will contact you shortly with the finalized quotation and payment details.</p>
        <button class="btn btn-primary" (click)="closeSuccess()">Back to Home</button>
      </div>
    </div>
  `,
  styles: [`
    .page-header.small { padding: 60px 0; background: var(--primary); color: var(--white); text-align: center; }
    .page-header.small h1 { font-size: 2.2rem; margin-bottom: 10px; }
    
    .cart-container { display: grid; grid-template-columns: 1fr 400px; gap: 40px; }
    
    .cart-items { display: flex; flex-direction: column; gap: 20px; }
    .cart-item { background: var(--white); border-radius: 15px; padding: 20px; display: grid; grid-template-columns: 80px 1fr 120px 100px 50px; align-items: center; gap: 20px; box-shadow: var(--shadow-soft); border: 1px solid #f0f4f8; }
    .item-img { background: #f8fbff; border-radius: 10px; padding: 10px; display: flex; align-items: center; justify-content: center; }
    .item-img img { width: 100%; height: auto; }
    .item-cat { font-size: 0.7rem; color: var(--secondary); font-weight: 700; text-transform: uppercase; }
    .item-info h3 { font-size: 1rem; margin: 3px 0; }
    .item-price { font-weight: 600; color: var(--primary); font-size: 0.95rem; }
    
    .item-qty { display: flex; align-items: center; gap: 15px; background: #f8fbff; padding: 5px 10px; border-radius: 50px; }
    .item-qty button { background: none; border: none; color: var(--primary); cursor: pointer; padding: 5px; }
    .item-qty span { font-weight: 700; min-width: 20px; text-align: center; }
    
    .item-total { font-weight: 700; color: var(--text-dark); text-align: right; }
    .remove-btn { background: none; border: none; color: #e53e3e; cursor: pointer; font-size: 1.1rem; opacity: 0.6; transition: var(--transition); }
    .remove-btn:hover { opacity: 1; transform: scale(1.1); }

    .summary-card { background: var(--white); border-radius: 20px; padding: 30px; box-shadow: var(--shadow-soft); border: 1px solid #f0f4f8; position: sticky; top: 100px; }
    .summary-card h3 { margin-bottom: 25px; border-bottom: 1px solid #f0f4f8; padding-bottom: 15px; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; color: var(--text-grey); font-size: 0.95rem; }
    .summary-row .free { color: var(--secondary); font-weight: 600; font-size: 0.8rem; }
    .summary-total { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 20px; border-top: 1px solid #f0f4f8; font-size: 1.2rem; font-weight: 700; color: var(--primary); }

    .checkout-form { margin-top: 40px; }
    .checkout-form h4 { margin-bottom: 20px; color: var(--text-dark); font-size: 1rem; }
    .form-group { margin-bottom: 15px; }
    .form-group input, .form-group textarea { width: 100%; padding: 12px 15px; border-radius: 10px; border: 1px solid #e0e6ed; outline: none; font-size: 0.9rem; }
    .form-group input:focus, .form-group textarea:focus { border-color: var(--primary); }
    .btn-block { width: 100%; padding: 15px; margin-top: 10px; }

    .empty-state { text-align: center; padding: 80px 0; }
    .empty-state i { font-size: 5rem; color: #cbd5e0; margin-bottom: 30px; }
    .empty-state h3 { font-size: 1.8rem; margin-bottom: 10px; }
    .empty-state p { margin-bottom: 30px; color: var(--text-grey); }

    .order-success { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 3000; padding: 20px; backdrop-filter: blur(8px); }
    .success-card { background: var(--white); border-radius: 30px; padding: 50px; text-align: center; max-width: 500px; animation: slideUp 0.5s ease; box-shadow: 0 30px 60px rgba(0,0,0,0.3); }
    
    .checkout-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 2500; padding: 20px; }
    .checkout-card { background: #fff; width: 100%; max-width: 600px; border-radius: 24px; padding: 32px; box-shadow: 0 40px 80px rgba(0,0,0,0.25); animation: checkoutSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .checkout-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .checkout-header h3 { font-size: 1.5rem; font-weight: 800; color: var(--text-dark); }
    .checkout-desc { color: var(--text-grey); font-size: 0.9rem; margin-bottom: 24px; }
    .close-btn { background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-grey); cursor: pointer; transition: 0.2s; }
    .close-btn:hover { background: #fee2e2; color: #ef4444; }
    
    .checkout-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    .checkout-form-grid .form-group { display: flex; flex-direction: column; gap: 8px; }
    .checkout-form-grid .form-group label { font-size: 0.75rem; font-weight: 700; color: var(--text-dark); text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.6; }
    .checkout-form-grid .form-group input, .checkout-form-grid .form-group textarea { padding: 12px 16px; border-radius: 12px; border: 1.5px solid #e2e8f0; font-size: 0.95rem; font-weight: 500; outline: none; transition: 0.2s; }
    .checkout-form-grid .form-group input:focus, .checkout-form-grid .form-group textarea:focus { border-color: var(--primary); background: #f8fbff; box-shadow: 0 0 0 4px rgba(141, 198, 63, 0.1); }
    .full-width { grid-column: 1 / 3; }
    
    .checkout-actions { display: flex; gap: 16px; justify-content: flex-end; }
    .checkout-actions .btn { padding: 14px 28px; width: auto; font-weight: 800; }
    .btn-outline { background: #f8fbff; color: var(--text-dark); border: 1.5px solid #e2e8f0; }
    .btn-outline:hover { background: #f1f5f9; border-color: #cbd5e1; }

    @keyframes checkoutSlide { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    @media (max-width: 640px) {
      .checkout-form-grid { grid-template-columns: 1fr; }
      .full-width { grid-column: 1; }
      .checkout-card { padding: 24px; }
    }

    .address-selector { margin-bottom: 24px; }
    .address-selector .subtitle { font-size: 0.8rem; font-weight: 800; color: var(--text-dark); text-transform: uppercase; margin-bottom: 12px; opacity: 0.6; }
    .address-chips { display: flex; gap: 12px; overflow-x: auto; padding: 4px; scrollbar-width: none; }
    .address-chips::-webkit-scrollbar { display: none; }
    .address-chip { min-width: 180px; max-width: 180px; padding: 16px; border-radius: 16px; border: 2px solid #f1f5f9; background: #fff; cursor: pointer; transition: 0.2s; }
    .address-chip:hover { border-color: var(--primary); background: #f8fbff; }
    .address-chip.active { border-color: var(--primary); background: #f8fbff; box-shadow: 0 8px 16px rgba(141, 198, 63, 0.1); }
    .chip-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .chip-name { font-size: 0.85rem; font-weight: 800; color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .chip-badge { font-size: 0.6rem; font-weight: 800; background: var(--primary); color: #fff; padding: 2px 6px; border-radius: 4px; }
    .chip-text { font-size: 0.75rem; color: #64748b; line-height: 1.4; }
    .address-chip.add-new { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; border: 2px dashed #e2e8f0; color: #64748b; }
    .address-chip.add-new i { font-size: 1.2rem; }
    .address-chip.add-new span { font-size: 0.8rem; font-weight: 700; }
  `]
})
export class CartComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  addressService = inject(AddressService);
  private http = inject(HttpClient);

  orderPlaced = signal(false);
  isProcessing = signal(false);
  showCheckoutForm = signal(false);

  checkoutData = {
    customerName: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    pincode: ''
  };

  selectedAddressId = signal<string>('');
  isLoggedIn = signal(this.authService.isLoggedIn());

  ngOnInit() {
    this.prefillCheckoutData();
    if (this.isLoggedIn()) {
      this.addressService.fetchAddresses().subscribe({
        next: (res) => {
          if (res.success && res.data.length > 0) {
            const defaultAddr = res.data.find((a: any) => a.isDefault) || res.data[0];
            this.selectSavedAddress(defaultAddr);
          }
        }
      });
    }
  }

  selectSavedAddress(addr: Address) {
    this.selectedAddressId.set(addr._id);
    this.checkoutData.customerName = addr.fullName;
    this.checkoutData.phone = addr.phone;
    this.checkoutData.address = addr.address;
    this.checkoutData.state = addr.state;
    this.checkoutData.pincode = addr.pincode;
  }

  useNewAddress() {
    this.selectedAddressId.set('new');
    this.checkoutData.address = '';
    this.checkoutData.state = '';
    this.checkoutData.pincode = '';
  }

  prefillCheckoutData() {
    const user = this.authService.currentUser();
    if (user) {
      this.checkoutData.customerName = user.fullName || '';
      this.checkoutData.email = user.email || '';
      this.checkoutData.phone = user.phone || '';
    }
  }

  placeOrder() {
    const { customerName, email, phone, address, state, pincode } = this.checkoutData;
    if (!customerName || !email || !phone || !address || !state || !pincode) {
      alert('Please fill in all required fields');
      return;
    }

    this.isProcessing.set(true);

    // If logged in and new address is used, save it automatically
    if (this.isLoggedIn() && this.selectedAddressId() === 'new') {
      this.addressService.addAddress({
        fullName: this.checkoutData.customerName,
        phone: this.checkoutData.phone,
        address: this.checkoutData.address,
        state: this.checkoutData.state,
        pincode: this.checkoutData.pincode,
        isDefault: false
      }).subscribe();
    }

    const orderData = {
      ...this.checkoutData,
      items: this.cartService.items().map(item => ({
        product: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        price: item.product.price,
        quantity: item.quantity
      })),
      amount: this.cartService.totalPrice()
    };

    this.http.post<any>('http://localhost:3000/api/orders', orderData).subscribe({
      next: (res) => {
        if (res.success) {
          this.orderPlaced.set(true);
          this.cartService.clearCart();
        }
        this.isProcessing.set(false);
      },
      error: (err) => {
        console.error('Error placing order:', err);
        alert(err.error?.message || 'Failed to place order. Please try again.');
        this.isProcessing.set(false);
      }
    });
  }

  closeSuccess() {
    this.orderPlaced.set(false);
    window.location.href = '/';
  }
}
