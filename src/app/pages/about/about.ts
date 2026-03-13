import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <!-- About Hero - Centered and Professional -->
      <section class="relative h-[350px] flex items-center justify-center overflow-hidden bg-background-dark text-center">
        <div class="absolute inset-0 pointer-events-none">
          <img src="lab-consumables.png" 
               alt="About Us Banner" 
               class="w-full h-full object-cover opacity-50">
          <div class="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/60 to-background-dark/90"></div>
        </div>
        
        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center gap-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
            <i class="fas fa-info-circle text-xs"></i> Reliable Healthcare Partner
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            ABOUT <span class="text-primary">ANIKA</span> HEALTH CARE
          </h1>
          <nav class="flex justify-center items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest">
            <a routerLink="/" class="hover:text-primary transition-colors">Home</a>
            <span class="w-1 h-1 rounded-full bg-white/20"></span>
            <span class="text-white">Our Story</span>
          </nav>
        </div>
      </section>

      <!-- Mission Section (Compact & Professional) -->
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="relative order-2 lg:order-1">
              <div class="rounded-2xl overflow-hidden border-8 border-slate-50 shadow-xl max-w-lg mx-auto">
                <img src="hero.png" alt="Anika Healthcare Team" class="w-full h-[400px] object-cover">
              </div>
              <div class="absolute -bottom-4 -right-2 bg-primary p-5 rounded-xl shadow-lg border-4 border-white hidden md:block">
                <p class="text-background-dark text-xl font-black leading-none">12+</p>
                <p class="text-background-dark font-bold text-[8px] uppercase tracking-wider mt-1">Years of Excellence</p>
              </div>
            </div>
            
            <div class="space-y-6 order-1 lg:order-2">
              <div class="space-y-4">
                <h2 class="text-primary font-bold tracking-widest uppercase text-[10px]">Your Reliable Partner</h2>
                <h3 class="text-3xl font-black text-slate-900 leading-tight">Anika Health Care – <br/> Building a Connected Ecosystem</h3>
                <div class="w-16 h-1 bg-primary rounded-full"></div>
              </div>
              
              <div class="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p class="font-bold text-slate-800 text-base">At Anika Health Care, we are committed to building a connected healthcare ecosystem that brings together patients, doctors, and nursing homes across India.</p>
                <p>Our platform is designed to simplify healthcare access and strengthen collaboration between healthcare providers and medical institutions. We enable patients to easily access healthcare services, connect with experienced doctors, and receive professional medical consultations without barriers.</p>
                <p>At the same time, our platform empowers nursing homes and healthcare centers to collaborate with renowned medical experts, improving healthcare delivery and patient outcomes. Our goal is to make quality healthcare accessible, reliable, and efficient.</p>
                <p>By combining technology, healthcare expertise, and patient-centered services, Anika Health Care ensures that individuals receive the right care at the right time.</p>
              </div>

              <div class="grid grid-cols-2 gap-4 pt-4">
                <div class="flex items-center gap-2 group">
                  <i class="fas fa-check-circle text-primary text-xs"></i>
                  <span class="text-[11px] font-bold text-slate-700 uppercase tracking-tight">Verified Doctors</span>
                </div>
                <div class="flex items-center gap-2 group">
                  <i class="fas fa-bolt text-primary text-xs"></i>
                  <span class="text-[11px] font-bold text-slate-700 uppercase tracking-tight">Fast Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Values Grid -->
      <section class="py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16 space-y-4">
            <h2 class="text-accent-gold font-bold tracking-widest uppercase text-[10px]">Our Core Values</h2>
            <h3 class="text-3xl font-black text-slate-900">Why Choose Anika Health Care</h3>
            <p class="text-slate-500 text-xs">Strengthening healthcare networks through innovation and trust.</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group" *ngFor="let feature of features">
              <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i [class]="'fa-solid ' + feature.icon + ' text-sm'"></i>
              </div>
              <h4 class="font-bold text-slate-800 mb-3 text-sm">{{feature.title}}</h4>
              <p class="text-slate-500 text-xs leading-relaxed">{{feature.description}}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AboutComponent {
  features = [
    {
      icon: 'fa-history',
      title: '12+ Years Experience',
      description: 'With extensive industry experience, Anika Health Care understands the evolving healthcare landscape.'
    },
    {
      icon: 'fa-user-doctor',
      title: 'Expert Medical Network',
      description: 'We collaborate with experienced doctors and specialists across India, bringing expert care closer.'
    },
    {
      icon: 'fa-bolt-lightning',
      title: 'Fast Healthcare Solutions',
      description: 'Our platform enables faster communication, ensuring timely medical assistance when it matters.'
    },
    {
      icon: 'fa-handshake',
      title: 'Strategic Collaboration',
      description: 'We create opportunities for institutions to collaborate with leading medical professionals.'
    },
    {
      icon: 'fa-microchip',
      title: 'Tech-Driven Approach',
      description: 'Integrating digital solutions to simplify healthcare coordination and improve efficiency.'
    },
    {
      icon: 'fa-headset',
      title: 'Prompt Dedicated Support',
      description: 'Our team assists patients and institutions with professional service and timely responses.'
    }
  ];
}
