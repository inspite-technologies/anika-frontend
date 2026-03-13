import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService, Product } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { AppComponent } from '../../app';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="products-page">
      <section class="page-header product-hero">
        <div class="container text-center">
          <span class="inline-block px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4">Our Catalog</span>
          <h2 class="text-white text-4xl md:text-5xl font-black mb-4">Our Products</h2>
          <nav class="flex justify-center items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-wider">
            <a routerLink="/" class="hover:text-primary transition-colors">Home</a>
            <span class="w-1 h-1 rounded-full bg-white/30"></span>
            <span class="text-white">Products</span>
          </nav>
        </div>
      </section>

      <section class="section-padding py-12">
        <div class="container">
          <!-- Filters & Search -->
          <div class="catalog-header flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div class="search-box relative w-full md:max-w-md">
              <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input type="text" 
                     placeholder="Search products..." 
                     (input)="onSearch($event)"
                     class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm">
            </div>
            
            <div class="filters flex flex-wrap gap-2 justify-center">
              <button *ngFor="let cat of categories" 
                      [class.active]="selectedCategory() === cat"
                      (click)="onCategoryChange(cat)"
                      class="px-5 py-2 rounded-full border border-slate-200 text-sm font-semibold transition-all hover:border-primary hover:text-primary active:scale-95"
                      [class.bg-primary]="selectedCategory() === cat"
                      [class.text-white]="selectedCategory() === cat"
                      [class.border-primary]="selectedCategory() === cat">
                {{cat}}
              </button>
            </div>
          </div>

          <!-- Product Grid -->
          <div *ngIf="paginatedProducts().length > 0; else noProducts">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="product-card group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" *ngFor="let p of paginatedProducts()">
                <div class="product-img relative h-56 bg-slate-50 flex items-center justify-center p-8">
                  <img [src]="p.image || '/lab-consumables.png'" [alt]="p.name" class="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500">
                  <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button class="w-12 h-12 rounded-full bg-white text-primary shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all scale-75 group-hover:scale-100" (click)="addToCart(p)">
                      <i class="fas fa-cart-plus"></i>
                    </button>
                    <a [routerLink]="['/product', p.id]" class="w-12 h-12 rounded-full bg-white text-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all scale-75 group-hover:scale-100">
                      <i class="fas fa-eye"></i>
                    </a>
                    <button class="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all scale-75 group-hover:scale-100" 
                            [class.text-red-500]="wishlistService.isInWishlist(p.id)" 
                            [class.text-slate-400]="!wishlistService.isInWishlist(p.id)"
                            (click)="toggleWishlist(p)">
                      <i class="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
                <div class="p-6">
                  <span class="text-[10px] font-black tracking-widest text-primary uppercase mb-2 block">{{p.category}}</span>
                  <h3 class="font-bold text-slate-800 line-clamp-1 mb-4">{{p.name}}</h3>
                  <div class="flex items-center justify-between">
                    <span class="text-lg font-black text-slate-900">₹{{p.price}}</span>
                    <button class="px-4 py-2 bg-slate-100 text-slate-400 text-xs font-bold rounded-lg cursor-not-allowed" *ngIf="p.quantity <= 0" disabled>
                      Out
                    </button>
                    <button class="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-primary transition-colors active:scale-95" *ngIf="p.quantity > 0" (click)="addToCart(p)">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination Control -->
            <div class="pagination flex items-center justify-center gap-2 mt-16">
              <button (click)="changePage(currentPage() - 1)" 
                      [disabled]="currentPage() === 1"
                      class="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <i class="fas fa-chevron-left text-xs"></i>
              </button>
              
              <div class="flex gap-2">
                <button *ngFor="let page of pageNumbers()" 
                        (click)="changePage(page)"
                        [class.active-page]="currentPage() === page"
                        class="w-10 h-10 rounded-xl border border-slate-200 text-sm font-bold transition-all"
                        [class.bg-primary]="currentPage() === page"
                        [class.text-white]="currentPage() === page"
                        [class.border-primary]="currentPage() === page"
                        [class.hover:bg-slate-50]="currentPage() !== page">
                  {{page}}
                </button>
              </div>

              <button (click)="changePage(currentPage() + 1)" 
                      [disabled]="currentPage() === totalPages()"
                      class="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <i class="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>

          <ng-template #noProducts>
            <div class="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <i class="fas fa-search text-5xl text-slate-200 mb-4 block"></i>
              <h3 class="text-xl font-bold text-slate-800">No products found</h3>
              <p class="text-slate-500">Try adjusting your filters or search keywords</p>
              <button (click)="selectedCategory.set('All'); searchQuery.set('')" class="mt-6 text-primary font-bold hover:underline">Clear all filters</button>
            </div>
          </ng-template>
        </div>
      </section>
    </main>

    <!-- Notification Toast -->
    <div class="fixed bottom-8 right-8 bg-background-dark text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-[3000] translate-y-20 opacity-0 transition-all duration-500" [class.!translate-y-0]="showToast()" [class.!opacity-100]="showToast()">
      <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
        <i class="fas fa-check"></i>
      </div>
      <div>
        <p class="text-sm font-bold">Added to Cart</p>
        <p class="text-[10px] text-slate-400">Item successfully added</p>
      </div>
    </div>
  `,
  styles: [`
    .product-hero { background: linear-gradient(rgba(26, 31, 19, 0.8), rgba(26, 31, 19, 0.8)), url('/blood-collection.png'); background-size: cover; background-position: center; padding: 80px 0; }
    .page-header h2 { font-size: 3rem; font-weight: 900; letter-spacing: -0.02em; }
    .active-page { transform: scale(1.1); box-shadow: 0 4px 12px rgba(141, 198, 63, 0.3); }
  `]
})
export class ProductsComponent implements OnInit {
  private cartService = inject(CartService);
  public wishlistService = inject(WishlistService);
  private appComponent = inject(AppComponent);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/products';

  categories = ['All', 'Blood Collection Tubes', 'Laboratory Consumables', 'Diagnostic Accessories', 'Sample Collection Products'];
  selectedCategory = signal('All');
  searchQuery = signal('');
  showToast = signal(false);
  currentPage = signal(1);
  pageSize = 8;

  products = signal<Product[]>([]);

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        if (res.success) {
          // Map _id to id and update the signal
          const fetchedProducts = res.data.map((p: any) => ({
            ...p,
            id: p._id
          }));
          this.products.set(fetchedProducts);
        }
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  filteredProducts = computed(() => {
    return this.products().filter(p => {
      const matchesCategory = this.selectedCategory() === 'All' || p.category === this.selectedCategory();
      const matchesSearch = p.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(this.searchQuery().toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  });

  paginatedProducts = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return this.filteredProducts().slice(startIndex, startIndex + this.pageSize);
  });

  totalPages = computed(() => Math.ceil(this.filteredProducts().length / this.pageSize));

  pageNumbers = computed(() => {
    const pages = [];
    for (let i = 1; i <= this.totalPages(); i++) pages.push(i);
    return pages;
  });

  onSearch(event: any) {
    this.searchQuery.set(event.target.value);
    this.currentPage.set(1);
  }

  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
    this.currentPage.set(1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  toggleWishlist(product: Product) {
    if (!this.appComponent.isLoggedIn()) {
      this.appComponent.setAuthModal('login');
      return;
    }

    if (this.wishlistService.isInWishlist(product.id)) {
      this.wishlistService.removeFromWishlist(product.id).subscribe();
    } else {
      this.wishlistService.addToWishlist(product.id).subscribe();
    }
  }
}
