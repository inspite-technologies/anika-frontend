import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService, WishlistItem } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="wishlist-page">
      <section class="page-header small">
        <div class="container">
          <h1>Your Wishlist</h1>
          <p>Managed saved diagnostic products and clinical laboratory essentials.</p>
        </div>
      </section>

      <section class="section-padding">
        <div class="container">
          <div class="wishlist-container" *ngIf="wishlistService.items().length > 0; else emptyWishlist">
            <div class="wishlist-grid">
              <div class="wishlist-item-card" *ngFor="let item of wishlistService.items()">
                <div class="item-img">
                  <img [src]="item.image || '/lab-consumables.png'" [alt]="item.name">
                  <button class="remove-btn" (click)="wishlistService.removeFromWishlist(item._id).subscribe()" title="Remove from Wishlist">
                    <i class="fas fa-heart"></i>
                  </button>
                </div>
                <div class="item-body">
                  <div class="item-header">
                    <span class="item-cat">{{item.category}}</span>
                    <h3>{{item.name}}</h3>
                  </div>
                  <div class="item-footer">
                    <div class="price-box">
                      <span class="label">Price</span>
                      <p class="item-price">₹{{item.price}}</p>
                    </div>
                    <div class="actions">
                      <button class="btn btn-outline btn-sm" [routerLink]="['/product', item._id]">
                        View Details
                      </button>
                      <button class="btn btn-primary btn-sm" (click)="addToCart(item)">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ng-template #emptyWishlist>
            <div class="empty-state">
              <i class="fas fa-heart-broken"></i>
              <h3>Your wishlist is empty</h3>
              <p>Looks like you haven't saved any diagnostic products yet.</p>
              <a routerLink="/products" class="btn btn-primary">Browse Catalog</a>
            </div>
          </ng-template>
        </div>
      </section>
    </main>

    <!-- Notification Toast -->
    <div class="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-[3000] transition-all duration-500" [class.translate-y-0]="showToast()" [class.opacity-100]="showToast()" [class.translate-y-20]="!showToast()" [class.opacity-0]="!showToast()">
      <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
        <i class="fas fa-check"></i>
      </div>
      <div>
        <p class="text-sm font-bold">Added to Cart</p>
        <p class="text-[10px] text-slate-400">Item successfully moved to basket</p>
      </div>
    </div>
  `,
  styles: [`
    .page-header.small { padding: 80px 0; background: linear-gradient(rgba(10, 77, 162, 0.85), rgba(10, 77, 162, 0.9)), url('/blood-collection.png'); background-size: cover; background-position: center; color: var(--white); text-align: center; }
    .page-header.small h1 { font-size: 3.2rem; font-weight: 900; margin-bottom: 12px; letter-spacing: -1px; }
    .page-header.small p { opacity: 0.9; font-size: 1.1rem; font-weight: 500; }
    
    .wishlist-container { max-width: 1250px; margin: 0 auto; padding: 0 15px; }
    .wishlist-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px; }
    
    .wishlist-item-card { 
      background: var(--white); 
      border-radius: 28px; 
      overflow: hidden; 
      display: flex; 
      flex-direction: column; 
      height: 100%;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03); 
      border: 1px solid #f1f5f9; 
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
    }
    
    .wishlist-item-card:hover { 
      transform: translateY(-8px); 
      box-shadow: 0 20px 40px rgba(10, 77, 162, 0.08); 
      border-color: rgba(141, 198, 63, 0.2);
    }
    
    .item-img { 
      position: relative; 
      height: 260px; 
      background: #f8fafc; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      padding: 40px; 
      overflow: hidden;
    }
    
    .item-img img { 
      max-width: 100%; 
      max-height: 100%; 
      object-fit: contain; 
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); 
    }
    
    .wishlist-item-card:hover .item-img img { transform: scale(1.1); }
    
    .remove-btn { 
      position: absolute; 
      top: 20px; 
      right: 20px; 
      background: white; 
      border: none; 
      width: 44px; 
      height: 44px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      color: #ef4444; 
      font-size: 1.2rem; 
      cursor: pointer; 
      box-shadow: 0 8px 16px rgba(239, 68, 68, 0.15); 
      transition: all 0.3s ease;
      z-index: 10;
    }
    
    .remove-btn:hover { 
      background: #ef4444; 
      color: white;
      transform: scale(1.1); 
    }
    
    .item-body { 
      padding: 28px; 
      flex: 1; 
      display: flex; 
      flex-direction: column; 
      gap: 20px; 
    }
    
    .item-header { flex: 1; }
    .item-cat { 
      font-size: 0.7rem; 
      color: var(--primary); 
      font-weight: 800; 
      text-transform: uppercase; 
      letter-spacing: 2px; 
      display: block;
      margin-bottom: 6px;
    }
    
    .item-header h3 { 
      font-size: 1.3rem; 
      color: #0f172a; 
      font-weight: 800; 
      line-height: 1.4; 
      margin: 0;
    }
    
    .item-footer { 
      display: flex; 
      flex-direction: column;
      gap: 16px;
      margin-top: auto;
      padding-top: 20px;
      border-top: 1px solid #f1f5f9;
    }
    
    .price-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .price-box .label { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; }
    .item-price { font-size: 1.6rem; font-weight: 950; color: #0f172a; margin: 0; }
    
    .actions { 
      display: grid; 
      grid-template-columns: 1fr 1.5fr; 
      gap: 12px; 
    }
    
    .btn {
      height: 48px;
      border-radius: 14px;
      font-weight: 800;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .btn-outline {
      border: 2px solid #e2e8f0;
      color: #475569;
      background: transparent;
    }
    
    .btn-outline:hover {
      border-color: #0f172a;
      color: #0f172a;
      background: #f8fafc;
    }
    
    .btn-primary {
      background: var(--primary);
      color: var(--white);
      border: none;
      box-shadow: 0 4px 12px rgba(141, 198, 63, 0.2);
    }
    
    .btn-primary:hover {
      filter: brightness(1.05);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(141, 198, 63, 0.3);
    }
    
    .empty-state { text-align: center; padding: 120px 20px; }
    .empty-state i { font-size: 5rem; color: #cbd5e0; margin-bottom: 24px; }
    .empty-state h3 { font-size: 2.2rem; margin-bottom: 12px; font-weight: 900; color: #1e293b; }
    .empty-state p { margin-bottom: 32px; color: #64748b; font-size: 1.1rem; }

    @media (max-width: 640px) {
      .page-header.small h1 { font-size: 2.5rem; }
      .wishlist-grid { grid-template-columns: 1fr; }
      .actions { grid-template-columns: 1fr; }
    }
  `]
})
export class WishlistComponent {
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  showToast = signal(false);

  addToCart(item: WishlistItem) {
    // Map WishlistItem to Product shape expected by CartService
    const product = {
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      description: item.description,
      quantity: 100 // Default or unknown, allow adding
    };
    
    this.cartService.addToCart(product);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }
}
