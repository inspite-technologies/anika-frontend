import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<main>
  <!-- Hero Section -->
  <section class="relative h-[500px] md:h-[600px] flex items-center overflow-hidden bg-background-dark">
    <div class="absolute inset-0">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2DQQBoHP2YcjcBSgXTqxyXJfC_KhKcz9-cxlLqbUC6syOtgX_4zBlJ862NmXVaJ6m_7WpJTjcXKR4r2Xb9ZWfATJ5_WB4JkKNtPmnB3XSZaNsgSe3kzkm__dbcFpR-9VFXEcNUx-DUFX66kdgHM1rYEGr5868w9ETdU4EwTniN-zQe7OCi9NA5UPhaSIJ4f4EaFFGzu-ZgBVtTYou_lkQBrVQrHgJDbazXt9u60b01gxTCXaTKxoyyX1QE0UjUdEheg9VQA5yW3gp" 
           alt="Hero Banner" 
           class="w-full h-full object-cover object-center opacity-90">
      <!-- Gradient overlay for text legibility -->
      <div class="absolute inset-0 bg-gradient-to-r from-background-dark/80 via-background-dark/40 to-transparent"></div>
    </div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="max-w-3xl space-y-4 md:space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider">
          <i class="fas fa-check-circle text-xs"></i> Excellence in Diagnostics
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
          EMPOWERING <span class="text-primary">DIAGNOSTICS</span>
        </h1>
        <p class="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl">
          Promoting Safe Diagnostic Tools. Advanced laboratory solutions and premium blood collection systems engineered for precision and patient safety.
        </p>
        <div class="flex flex-wrap gap-4 pt-4">
          <button class="bg-primary hover:bg-primary/90 text-background-dark px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg transition-all flex items-center gap-2" routerLink="/products">
            Explore Products <i class="fas fa-arrow-right"></i>
          </button>
          <div class="flex items-center gap-4">
            <div class="flex -space-x-3">
              <div class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background-dark bg-accent-gold flex items-center justify-center text-[8px] md:text-[10px] font-bold">NABL</div>
              <div class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background-dark bg-white flex items-center justify-center text-[8px] md:text-[10px] font-bold text-black">ISO</div>
              <div class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-background-dark bg-primary flex items-center justify-center text-[8px] md:text-[10px] font-bold text-black">GMP</div>
            </div>
            <span class="text-white/80 text-xs md:text-sm font-medium">Quality Certified Manufacturer</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Expertise Stats -->
  <section class="py-12 bg-white dark:bg-background-dark border-b border-primary/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <div class="text-center p-4 md:p-6 rounded-xl hover:bg-background-light dark:hover:bg-white/5 transition-colors">
          <p class="text-3xl md:text-4xl font-black text-primary mb-1">50+</p>
          <p class="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-slate-500">Countries Served</p>
        </div>
        <div class="text-center p-4 md:p-6 rounded-xl hover:bg-background-light dark:hover:bg-white/5 transition-colors border-l border-primary/10">
          <p class="text-3xl md:text-4xl font-black text-primary mb-1">10k+</p>
          <p class="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-slate-500">Facilities</p>
        </div>
        <div class="text-center p-4 md:p-6 rounded-xl hover:bg-background-light dark:hover:bg-white/5 transition-colors border-t md:border-t-0 md:border-l border-primary/10 col-span-1">
          <p class="text-3xl md:text-4xl font-black text-primary mb-1">500+</p>
          <p class="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-slate-500">Professionals</p>
        </div>
        <div class="text-center p-4 md:p-6 rounded-xl hover:bg-background-light dark:hover:bg-white/5 transition-colors border-t md:border-t-0 border-l border-primary/10">
          <p class="text-3xl md:text-4xl font-black text-primary mb-1">200+</p>
          <p class="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-slate-500">Products</p>
        </div>
      </div>
    </div>
  </section>


  <!-- Product Categories -->
  <section class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 md:mb-16 space-y-4">
        <h2 class="text-accent-gold font-bold tracking-widest uppercase text-xs md:text-sm">Product Portfolio</h2>
        <h3 class="text-3xl md:text-4xl font-black">Innovative Diagnostic Solutions</h3>
        <div class="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <!-- Card 1 -->
        <div class="group bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-primary/10">
          <div class="aspect-video bg-cover bg-center" style="background-image: url('blood-collection.png');"></div>
          <div class="p-6 md:p-8 space-y-4">
            <h4 class="text-xl font-bold group-hover:text-primary transition-colors">Blood Collection Systems</h4>
            <p class="text-slate-500 text-sm leading-relaxed">Precision-engineered vacuum tubes and accessories designed for safety and specimen integrity.</p>
            <a class="inline-flex items-center text-primary font-bold text-sm gap-2 cursor-pointer" routerLink="/products" [queryParams]="{category: 'Blood Collection Tubes'}">
              Explore Category <i class="fas fa-external-link-alt text-xs"></i>
            </a>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="group bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-primary/10">
          <div class="aspect-video bg-cover bg-center" style="background-image: url('lab-consumables.png');"></div>
          <div class="p-6 md:p-8 space-y-4">
            <h4 class="text-xl font-bold group-hover:text-primary transition-colors">Laboratory Consumables</h4>
            <p class="text-slate-500 text-sm leading-relaxed">High-grade plasticware and essential supplies for modern clinical laboratories.</p>
            <a class="inline-flex items-center text-primary font-bold text-sm gap-2 cursor-pointer" routerLink="/products" [queryParams]="{category: 'Laboratory Consumables'}">
              Explore Category <i class="fas fa-external-link-alt text-xs"></i>
            </a>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="group bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-primary/10">
          <div class="aspect-video bg-cover bg-center" style="background-image: url('poc-solutions.png');"></div>
          <div class="p-6 md:p-8 space-y-4">
            <h4 class="text-xl font-bold group-hover:text-primary transition-colors">Point of Care Solutions</h4>
            <p class="text-slate-500 text-sm leading-relaxed">Rapid, reliable diagnostic technology for immediate clinical decision-making at the bedside.</p>
            <a class="inline-flex items-center text-primary font-bold text-sm gap-2 cursor-pointer" routerLink="/products" [queryParams]="{category: 'Diagnostic Accessories'}">
              Explore Category <i class="fas fa-external-link-alt text-xs"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Expertise Section -->
  <section class="py-16 md:py-24 bg-background-dark text-white relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div class="space-y-6 md:space-y-10">
          <div class="space-y-4">
            <h2 class="text-primary font-bold tracking-widest uppercase text-xs md:text-sm">A Heritage of Care</h2>
            <h3 class="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">Expertise that powers <br class="hidden md:block"/> clinical decisions</h3>
            <p class="text-slate-400 text-base md:text-lg max-w-xl">Our deep-rooted knowledge across medical disciplines ensures that every product meets the rigorous demands of modern healthcare.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 md:gap-y-5 gap-x-6 md:gap-x-8">
            <div class="pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors py-1">
              <span class="font-bold text-slate-100 text-sm md:text-base">Biochemistry</span>
            </div>
            <div class="pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors py-1">
              <span class="font-bold text-slate-100 text-sm md:text-base">Hematology</span>
            </div>
            <div class="pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors py-1">
              <span class="font-bold text-slate-100 text-sm md:text-base">Immunology</span>
            </div>
            <div class="pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors py-1">
              <span class="font-bold text-slate-100 text-sm md:text-base">Coagulation</span>
            </div>
            <div class="pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors py-1">
              <span class="font-bold text-slate-100 text-sm md:text-base">Molecular Diagnostics</span>
            </div>
            <div class="pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors py-1">
              <span class="font-bold text-slate-100 text-sm md:text-base">Critical Care</span>
            </div>
            <div class="pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors py-1">
              <span class="font-bold text-slate-100 text-sm md:text-base">Advanced Immunology</span>
            </div>
            <div class="pl-4 border-l-2 border-primary/30 hover:border-primary transition-colors py-1">
              <span class="font-bold text-slate-100 text-sm md:text-base">Hematology Experts</span>
            </div>
          </div>
        </div>
        <div class="relative mt-8 md:mt-0">
          <div class="rounded-2xl overflow-hidden border-4 md:border-8 border-white/5 shadow-2xl">
            <img alt="Medical Expertise" class="w-full h-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw7sB4IryLjZDoZbGDt0osqgd1ysBkg4rS7APfefD68v-vi30YIIwsODtAhjr9TlOMG3S1bQr161FNFRxlif3fRqB3bpF8F0UHsh-Z_5s4jPttq8sT_0rOJ7r7wQ_NMFZQLvSjEMf6F8_lhstFHAm2u8UBexLRycFmuGUNBTBXOB3zIpEIWrwJjaaBCb89eISBjg8yGS_qiI4lyoaYy01rP2HYTwKmtIL1gZX3OqIrZ4PWNTvO1vIPhe2eBp5rH9bTUo2eGMYrX1m2"/>
          </div>
          <div class="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-accent-gold p-4 md:p-8 rounded-xl shadow-lg max-w-[200px] md:max-w-xs">
            <p class="text-background-dark text-sm md:text-lg font-bold leading-tight">NABL Standard Excellence</p>
            <p class="text-background-dark/80 text-[10px] md:text-sm mt-1 md:mt-2">Adhering to global benchmarks for quality.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonial Section with Background Banner -->
  <section class="relative py-12 overflow-hidden text-white">
    <!-- Background Banner Image -->
    <div class="absolute inset-0 bg-cover bg-center shadow-inner" style="background-image: url('quote.jpg');">
      <!-- Deep Professional Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-background-dark/95 to-background-dark/60"></div>
    </div>

    <!-- Background Logo Watermark -->
    <div class="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none z-10">
      <img src="logo-removebg-preview.png" alt="Branding" class="w-[450px] h-auto grayscale invert">
    </div>

    <div class="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-20">
      <div class="inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
        <i class="fas fa-quote-left text-3xl text-primary"></i>
      </div>
      
      <blockquote class="text-2xl md:text-3xl font-medium italic leading-relaxed text-slate-100 drop-shadow-lg" style="font-family: 'Playfair Display', serif;">
        "Anaikha Healthcare's commitment to quality isn't just a corporate slogan; it's evident in every precision-engineered tool they produce. They are a vital partner in our mission for patient safety."
      </blockquote>
      
    </div>
  </section>

  <!-- What's New -->
  <section class="py-16 md:py-24 bg-background-light dark:bg-background-dark/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div class="space-y-4">
          <h2 class="text-accent-gold font-bold tracking-widest uppercase text-xs md:text-sm">Media & Updates</h2>
          <h3 class="text-3xl md:text-4xl font-black">What's New at Anaikha</h3>
        </div>
        <button class="text-primary font-bold flex items-center gap-2 hover:underline text-sm md:text-base">
          View All News <i class="fas fa-chevron-right text-xs"></i>
        </button>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div class="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-primary/5 overflow-hidden">
          <div class="aspect-video bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqLkzMI2r3V5kgg9bOTSTf5kLFaUVA52xJkxTQj2gyKKdpRJKDtrvGGHnnV4d2M81CgkdxLEocgdMoSSQoNoyPH2EkRWCwlF4PImcoW3bDnWI4bOau3-pIPIE1B1pKSnSxsUt3dvakWC5KoId1tTIe_Uf5CWJjeSl7mSWprcWe-v8EzWiCdEzxyhaH3-jQnBDDMcO9hANXWIEZzykfjfbYgO8wdB9B2R4bovo_6rFUt-vpooNjl9huA6sUmCCdte6eBJaCma_2syX6');"></div>
          <div class="p-5 md:p-6 space-y-3">
            <span class="text-accent-gold text-xs font-bold uppercase">Expansion</span>
            <h4 class="text-lg font-bold leading-tight">Expanding Our Manufacturing Facility in Bangalore</h4>
            <p class="text-slate-500 text-sm">Increasing capacity to serve the growing global demand for premium diagnostic kits.</p>
          </div>
        </div>
        <div class="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-primary/5 overflow-hidden">
          <div class="aspect-video bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQkpRaZNDh1Jn_nKXloSg1KQQ4Ip--BRZAmmBIGdB4RA5CpoL7KVGDR5UjEq_63gE0uPG9jMjEWNVpMJamL5m-5Se5Nleppji8CtT0Ah5z9lsr6XxK4W8HRofRDRJ8zF2aXRUtG2TYzm1bwFswImUWBCJQTI237-G-K8YXVy6qNvhM-9LVGjIDwzFUIJ6-VgBeEsPtBXgd4qFf_hY-lwnUXj86Bs4FyLXo_IusI2xnVLOmXh72y36fIkOdoAKhasvT9N5--rEJkoJp');"></div>
          <div class="p-5 md:p-6 space-y-3">
            <span class="text-accent-gold text-xs font-bold uppercase">Quality</span>
            <h4 class="text-lg font-bold leading-tight">Successful ISO 13485:2016 Recertification</h4>
            <p class="text-slate-500 text-sm">Reaffirming our commitment to the highest quality management systems for medical devices.</p>
          </div>
        </div>
        <div class="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-primary/5 overflow-hidden">
          <div class="aspect-video bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7BfzRUmxQjxnY5fsz4PEweB6cYs1hh8KJdNXztyUmRWo2I15OtDWM-P3utFe8LO0fIN32c2FexSAXppiem8Q7O5OUF-iUzY2KfDlnKln-T4skw2Qh1UJxkyf0-JjbWP7X09PM248l5uuyjcGwSrHP0TDwQ7r5SJuRw8Kn7TlMbRpzNjpHMHiqvB31RhbDg_LB-VAOFEWQDRv0FeT5mO1BTqx6rtCzmwr0uxMR6hQM6QHpO6ZCNUTZ01FlUbrZIc54PrrSphYwdUqa');"></div>
          <div class="p-5 md:p-6 space-y-3">
            <span class="text-accent-gold text-xs font-bold uppercase">Events</span>
            <h4 class="text-lg font-bold leading-tight">Showcasing Innovations at MediTech Global Expo</h4>
            <p class="text-slate-500 text-sm">Presenting our latest Point of Care solutions to healthcare leaders worldwide.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
  `,
  styles: []
})
export class HomeComponent { }
