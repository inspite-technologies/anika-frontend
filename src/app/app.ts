import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { OrderService, Order } from './services/order.service';
import { AuthService } from './services/auth.service';
import { WishlistService, WishlistItem } from './services/wishlist.service';
import { AddressService, Address } from './services/address.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  authService = inject(AuthService);
  wishlistService = inject(WishlistService);
  addressService = inject(AddressService);
  router = inject(Router);
  title = 'anika-healthcare';

  // Auth Modal State
  authModal = signal<'none' | 'login' | 'signup' | 'verify-otp' | 'forgot' | 'reset-password' | 'profile' | 'verify-security' | 'wishlist'>('none');
  isLoggedIn = signal(this.authService.isLoggedIn()); 
  profileTab = signal<'orders' | 'addresses' | 'security'>('orders');
  isMenuOpen = signal(false);

  // Form Data
  loginData = { email: '', password: '' };
  signupData = { fullName: '', email: '', phone: '', password: '' };
  otpData = { email: '', otp: '' };
  forgotPasswordData = { email: '', otp: '', newPassword: '' };
  securityData = { otp: '', newPassword: '', confirmPassword: '' };
  authError = signal<string | null>(null);
  authSuccess = signal<string | null>(null);
  isLoading = signal(false);

  // Orders State
  orders = signal<Order[]>([]);
  selectedOrder = signal<Order | null>(null);
  userEmail = 'akshai@example.com';

  constructor() {
    // Effect to handle auth state changes globally
    effect(() => {
      this.isLoggedIn.set(this.authService.isLoggedIn());
      if (this.isLoggedIn()) {
        this.fetchOrders();
        this.fetchWishlist();
        this.fetchAddresses();
      }
    }, { allowSignalWrites: true });

    // Effect to fetch orders when modal changes to profile
    effect(() => {
      if (this.authModal() === 'profile' && this.isLoggedIn()) {
        this.fetchOrders();
      }
    }, { allowSignalWrites: true });
  }

  fetchOrders() {
    this.orderService.getOrdersByEmail(this.authService.currentUser()?.email || '').subscribe({
      next: (res) => this.orders.set(res.data || []),
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  fetchAddresses() {
    this.addressService.fetchAddresses().subscribe({
      error: (err) => console.error('Error fetching addresses:', err)
    });
  }

  // Address Management
  showAddAddress = signal(false);
  newAddress = {
    fullName: '',
    phone: '',
    address: '',
    state: '',
    pincode: '',
    isDefault: false
  };

  saveNewAddress() {
    const { fullName, phone, address, state, pincode } = this.newAddress;
    if (!fullName || !phone || !address || !state || !pincode) {
      alert('Please fill all fields');
      return;
    }

    this.addressService.addAddress(this.newAddress).subscribe({
      next: (res) => {
        if (res.success) {
          this.showAddAddress.set(false);
          this.newAddress = { fullName: '', phone: '', address: '', state: '', pincode: '', isDefault: false };
        }
      }
    });
  }

  deleteAddress(id: string) {
    if (confirm('Delete this address?')) {
      this.addressService.deleteAddress(id).subscribe();
    }
  }

  setDefaultAddress(id: string) {
    this.addressService.setDefault(id).subscribe();
  }

  fetchWishlist() {
    this.wishlistService.getWishlist().subscribe({
      error: (err) => console.error('Error fetching wishlist:', err)
    });
  }

  toggleWishlist(productId: string) {
    if (!this.isLoggedIn()) {
      this.setAuthModal('login');
      return;
    }

    if (this.wishlistService.isInWishlist(productId)) {
      this.wishlistService.removeFromWishlist(productId).subscribe();
    } else {
      this.wishlistService.addToWishlist(productId).subscribe();
    }
  }

  viewOrderDetails(order: Order) {
    this.selectedOrder.set(order);
  }

  closeOrderDetails() {
    this.selectedOrder.set(null);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  setAuthModal(view: 'none' | 'login' | 'signup' | 'verify-otp' | 'forgot' | 'reset-password' | 'profile' | 'verify-security' | 'wishlist') {
    this.authModal.set(view);
    this.authError.set(null);
    this.authSuccess.set(null);
  }

  closeAuthModal(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.setAuthModal('none');
    }
  }

  handleLogin(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);
    this.authError.set(null);

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.isLoggedIn.set(true);
          this.setAuthModal('none');
          this.loginData = { email: '', password: '' };
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.authError.set(err.error?.message || 'Login failed. Please try again.');
      }
    });
  }

  handleSignup(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);
    this.authError.set(null);

    this.authService.register(this.signupData).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.otpData.email = this.signupData.email;
          this.authSuccess.set(res.message);
          this.setAuthModal('verify-otp');
          this.signupData = { fullName: '', email: '', phone: '', password: '' };
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.authError.set(err.error?.message || 'Registration failed. Please try again.');
      }
    });
  }

  handleVerifyOTP(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);
    this.authError.set(null);

    this.authService.verifyOTP(this.otpData.email, this.otpData.otp).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.authSuccess.set('Verification successful! You can now login.');
          this.setAuthModal('login');
          this.otpData = { email: '', otp: '' };
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.authError.set(err.error?.message || 'Verification failed. Please check your OTP.');
      }
    });
  }

  handleForgotPassword(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);
    this.authError.set(null);

    this.authService.forgotPassword(this.forgotPasswordData.email).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.authSuccess.set(res.message);
          this.setAuthModal('reset-password');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.authError.set(err.error?.message || 'Failed to send reset OTP.');
      }
    });
  }

  handleResetPassword(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);
    this.authError.set(null);

    this.authService.resetPassword({
      email: this.forgotPasswordData.email,
      otp: this.forgotPasswordData.otp,
      newPassword: this.forgotPasswordData.newPassword
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.authSuccess.set('Password reset successful! Please login.');
          this.setAuthModal('login');
          this.forgotPasswordData = { email: '', otp: '', newPassword: '' };
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.authError.set(err.error?.message || 'Failed to reset password.');
      }
    });
  }

  handleSecurityOTP() {
    this.isLoading.set(true);
    this.authError.set(null);
    this.authSuccess.set(null);

    this.authService.sendChangePasswordOTP().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.authSuccess.set(res.message);
          this.setAuthModal('verify-security');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.authError.set(err.error?.message || 'Failed to send security OTP.');
      }
    });
  }

  handlePasswordUpdate(event: Event) {
    event.preventDefault();
    if (this.securityData.newPassword !== this.securityData.confirmPassword) {
      this.authError.set("Passwords do not match!");
      return;
    }

    this.isLoading.set(true);
    this.authError.set(null);

    this.authService.changePassword({
      otp: this.securityData.otp,
      newPassword: this.securityData.newPassword
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          alert("Password updated successfully!");
          this.setAuthModal('none');
          this.securityData = { otp: '', newPassword: '', confirmPassword: '' };
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.authError.set(err.error?.message || 'Failed to update password.');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.wishlistService.clearWishlist();
    this.isLoggedIn.set(false);
    this.setAuthModal('none');
  }

  setProfileTab(tab: 'orders' | 'security') {
    this.profileTab.set(tab);
  }

  handlePasswordChange(event: Event) {
    event.preventDefault();
    alert("Password updated securely!");
    this.setProfileTab('orders');
  }
}
