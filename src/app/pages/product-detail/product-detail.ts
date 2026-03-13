import { Component, inject, signal, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService, Product } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { AppComponent } from '../../app';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="product-detail-page bg-slate-50/50 min-h-screen" *ngIf="product()">
      <!-- Header / Breadcrumb -->
      <header class="bg-white border-b border-slate-100 py-6">
        <div class="container">
          <nav class="breadcrumb">
            <a routerLink="/" class="home-link"><i class="fas fa-home"></i></a> 
            <span class="sep">/</span>
            <a routerLink="/products">Products</a> 
            <span class="sep">/</span>
            <span class="active">{{product()?.name}}</span>
          </nav>
        </div>
      </header>

      <section class="py-12 md:py-20">
        <div class="container max-w-6xl">
          <div class="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
            <div class="grid md:grid-cols-2 items-center">
              <!-- Product Image -->
              <div class="p-8 md:p-16 bg-slate-50/50 flex justify-center items-center border-b md:border-b-0 md:border-r border-slate-100">
                <div class="image-wrapper shadow-2xl rounded-2xl bg-white p-6">
                  <img [src]="product()?.image || '/lab-consumables.png'" [alt]="product()?.name" class="product-img-main">
                </div>
              </div>

              <!-- Product Info -->
              <div class="p-8 md:p-16 space-y-8">
                <div class="space-y-4">
                  <span class="category-tag">{{product()?.category}}</span>
                  <h1 class="text-3xl md:text-4xl font-black text-slate-800 leading-tight">{{product()?.name}}</h1>
                  <div class="price-tag">₹{{product()?.price?.toLocaleString()}}</div>
                </div>

                <div class="description-box">
                  <p class="text-slate-500 leading-relaxed text-lg">{{product()?.description}}</p>
                  <div class="quality-blurb flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10 mt-6">
                    <i class="fas fa-shield-check text-primary mt-1"></i>
                    <p class="text-sm text-slate-600 font-medium">This product adheres to the highest medical-grade standards, ensuring precision and reliability in critical diagnostic environments.</p>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                  <div class="qty-group flex items-center bg-slate-100 rounded-full px-2 py-1 w-fit">
                    <button class="qty-btn" (click)="changeQty(-1)"><i class="fas fa-minus"></i></button>
                    <span class="qty-val px-6 font-black text-lg">{{quantity()}}</span>
                    <button class="qty-btn" (click)="changeQty(1)"><i class="fas fa-plus"></i></button>
                  </div>
                                    <button class="flex-1 bg-primary hover:bg-primary/90 text-background-dark h-14 rounded-full font-black text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale" 
                          (click)="addToCart()" 
                          [disabled]="!product()?.quantity || product()!.quantity <= 0">
                      <i class="fas fa-shopping-cart"></i> 
                      {{ (product()?.quantity && product()!.quantity > 0) ? 'Add to Cart' : 'Out of Stock' }}
                    </button>
                    
                    <button class="w-14 h-14 rounded-full border-2 transition-all flex items-center justify-center text-xl active:scale-95"
                            [class.border-red-500]="wishlistService.isInWishlist(product()?.id || '')"
                            [class.text-red-500]="wishlistService.isInWishlist(product()?.id || '')"
                            [class.border-slate-200]="!wishlistService.isInWishlist(product()?.id || '')"
                            [class.text-slate-400]="!wishlistService.isInWishlist(product()?.id || '')"
                            (click)="toggleWishlist()">
                      <i class="fas fa-heart"></i>
                    </button>
                  </div>

                <!-- Trust Badges -->
                <div class="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100">
                  <div class="trust-badge">
                    <i class="fas fa-certificate"></i>
                    <span>ISO Certified</span>
                  </div>
                  <div class="trust-badge">
                    <i class="fas fa-vial"></i>
                    <span>Lab Tested</span>
                  </div>
                  <div class="trust-badge">
                    <i class="fas fa-truck-fast"></i>
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div class="toast" [class.show]="showToast()">
      <i class="fas fa-check-circle"></i>
      <div class="toast-content">
        <p class="toast-title">Added to Cart</p>
        <p class="toast-desc">Item successfully added to your diagnostic basket.</p>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    
    .breadcrumb { display: flex; align-items: center; gap: 12px; color: #94a3b8; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .breadcrumb a { color: #64748b; text-decoration: none; transition: color 0.3s; }
    .breadcrumb a:hover { color: var(--primary); }
    .breadcrumb .sep { opacity: 0.3; }
    .breadcrumb .active { color: var(--primary); }
    .home-link { font-size: 1.1rem; }

    .image-wrapper { width: 320px; height: 320px; display: flex; align-items: center; justify-content: center; transition: transform 0.5s; }
    .image-wrapper:hover { transform: scale(1.05); }
    .product-img-main { max-width: 90%; max-height: 90%; object-contain: contain; }

    .category-tag { background: rgba(141, 198, 63, 0.1); color: var(--primary); padding: 6px 16px; rounded: 50px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
    .price-tag { font-size: 2.5rem; font-weight: 900; color: #1e293b; letter-spacing: -1px; }

    .qty-btn { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1e293b; transition: background 0.3s; border: none; background: transparent; cursor: pointer; }
    .qty-btn:hover { background: rgba(0,0,0,0.05); }

    .trust-badge { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
    .trust-badge i { font-size: 1.2rem; color: var(--primary); opacity: 0.8; }
    .trust-badge span { font-size: 0.7rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }

    .toast { position: fixed; top: 30px; right: 30px; background: #fff; color: #1e293b; padding: 20px; border-radius: 20px; display: flex; align-items: center; gap: 15px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); border-left: 6px solid var(--primary); transform: translateX(400px); transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); z-index: 2000; }
    .toast.show { transform: translateX(0); }
    .toast i { font-size: 2rem; color: var(--primary); }
    .toast-title { font-weight: 800; font-size: 1rem; margin: 0; }
    .toast-desc { font-size: 0.8rem; color: #64748b; margin: 0; }

    @media (max-width: 768px) {
      .image-wrapper { width: 200px; height: 200px; }
      .price-tag { font-size: 2rem; }
      .product-detail-page { text-align: center; }
      .category-tag { margin: 0 auto; }
      .qty-group { margin: 0 auto; }
      .trust-badge i { font-size: 1rem; }
      .trust-badge span { font-size: 0.6rem; }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  public wishlistService = inject(WishlistService);
  private appComponent = inject(AppComponent);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/products';

  product = signal<Product | null>(null);
  quantity = signal(1);
  showToast = signal(false);
  relatedProducts = signal<Product[]>([]);

  products: Product[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchProduct(id);
      window.scrollTo(0, 0);
    });
  }

  fetchProduct(id: string) {
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
      next: (res) => {
        if (res.success) {
          const p = { ...res.data, id: res.data._id };
          this.product.set(p);
          // Still fetch in case needed, but we don't display them anymore per request
          this.fetchRelatedProducts(p.category, p.id);
        }
      },
      error: (err) => console.error('Error fetching product:', err)
    });
  }

  fetchRelatedProducts(category: string, currentId: string) {
    this.http.get<any>(`${this.apiUrl}?category=${category}`).subscribe({
      next: (res) => {
        if (res.success) {
          const related = res.data
            .filter((p: any) => p._id !== currentId)
            .slice(0, 4)
            .map((p: any) => ({ ...p, id: p._id }));
          this.relatedProducts.set(related);
        }
      },
      error: (err) => console.error('Error fetching related products:', err)
    });
  }

  changeQty(delta: number) {
    const max = this.product()?.quantity || 0;
    this.quantity.update(q => {
      const next = q + delta;
      if (next > max) {
        alert(`Only ${max} items available in stock`);
        return max;
      }
      return Math.max(1, next);
    });
  }

  addToCart() {
    const p = this.product();
    if (p) {
      this.cartService.addToCart(p, this.quantity());
      this.showToast.set(true);
      setTimeout(() => this.showToast.set(false), 3000);
    }
  }

  toggleWishlist() {
    const p = this.product();
    if (!p) return;

    if (!this.appComponent.isLoggedIn()) {
      this.appComponent.setAuthModal('login');
      return;
    }

    if (this.wishlistService.isInWishlist(p.id)) {
      this.wishlistService.removeFromWishlist(p.id).subscribe();
    } else {
      this.wishlistService.addToWishlist(p.id).subscribe();
    }
  }
}
