import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main>
      <!-- Services Hero - Centered and Compact -->
      <section class="relative h-[450px] flex items-center justify-center overflow-hidden bg-background-dark text-center">
        <div class="absolute inset-0 pointer-events-none">
          <img src="poc-solutions.png" 
               alt="Services Hero Banner" 
               class="w-full h-full object-cover opacity-60">
          <div class="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/70 to-background-dark/90"></div>
        </div>
        
        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center gap-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
            <i class="fas fa-stethoscope text-xs"></i> Dedicated Healthcare Solutions
          </div>
          
          <h1 class="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            PRECISION <span class="text-primary">CARE</span> COORDINATION
          </h1>
          
          <p class="text-md text-slate-300 leading-relaxed max-w-2xl font-medium">
            Connecting patients, doctors, and institutions through a seamless, <br class="hidden md:block"/> technology-driven healthcare ecosystem.
          </p>
          
          <div class="pt-2">
            <button class="bg-primary hover:bg-primary/90 text-background-dark px-8 py-3.5 rounded-xl font-black text-sm transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-1 active:scale-95" routerLink="/appointment">
              Book Appointment <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Main Services Section -->
      <section class="py-24 bg-white dark:bg-background-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16 space-y-4">
            <h2 class="text-accent-gold font-bold tracking-widest uppercase text-sm">Our Core Services</h2>
            <h3 class="text-4xl font-black text-slate-900 dark:text-white">Professional Medical Support</h3>
            <div class="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="group bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-primary/10" *ngFor="let service of services">
              <div class="aspect-video bg-cover bg-center overflow-hidden">
                <img [src]="service.image" [alt]="service.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              </div>
              <div class="p-8 space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <i [class]="'fas ' + service.icon"></i>
                    </div>
                    <h4 class="text-lg font-bold group-hover:text-primary transition-colors">{{service.title}}</h4>
                </div>
                <p class="text-slate-500 text-sm leading-relaxed">{{service.description}}</p>
                <a routerLink="/appointment" class="inline-flex items-center text-primary font-bold text-xs gap-2 cursor-pointer uppercase tracking-wider">
                  Learn More <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Section -->
      <section class="py-24 bg-background-dark text-white relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-10">
              <div class="space-y-4">
                <h2 class="text-primary font-bold tracking-widest uppercase text-sm">Benefits</h2>
                <h3 class="text-4xl md:text-5xl font-black leading-tight text-white">Why Partner <br class="hidden md:block"/> With Anaikha?</h3>
                <p class="text-slate-400 text-md max-w-xl">We leverage cutting-edge technology and deep medical expertise to build a more efficient, reliable, and patient-centric healthcare environment.</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                <div class="space-y-2 pl-4 border-l-2 border-primary/40 hover:border-primary transition-colors py-1 group" *ngFor="let feature of features">
                    <div class="space-y-1">
                        <span class="font-black text-slate-100 block text-base md:text-lg tracking-tight group-hover:text-primary transition-colors text-shadow-sm">{{feature.title}}</span>
                        <p class="text-sm text-slate-400 block leading-relaxed font-medium">{{feature.desc}}</p>
                    </div>
                </div>
              </div>
            </div>
            <div class="relative">
              <div class="rounded-2xl overflow-hidden border-8 border-white/5 shadow-2xl">
                <img alt="Medical Excellence" class="w-full h-[450px] object-cover" src="hero.png"/>
              </div>
              <div class="absolute -bottom-6 -left-6 bg-accent-gold p-6 rounded-xl shadow-lg max-w-[200px]">
                <p class="text-background-dark text-2xl font-black">24/7</p>
                <p class="text-background-dark font-bold text-xs uppercase tracking-wider mt-1">Global Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-primary/5">
        <div class="max-w-4xl mx-auto px-4 text-center space-y-8">
           <h3 class="text-3xl font-black text-slate-900">Need Medical Assistance?</h3>
           <p class="text-slate-500 text-lg">Our expert team is ready to coordinate your care with the highest standards of excellence.</p>
           <button class="bg-primary hover:bg-primary/90 text-background-dark px-10 py-4 rounded-xl font-black transition-all shadow-lg hover:shadow-primary/20 scale-100 active:scale-95" routerLink="/appointment">
             Book An Appointment Today
           </button>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(rgba(10, 77, 162, 0.4), rgba(10, 77, 162, 0.4)), url('/poc-solutions.png');
      background-size: cover;
      background-position: center;
      padding: 70px 0 60px;
      color: var(--white);
      text-align: center;
      position: relative;
    }
    .page-header h1 { 
      font-size: 3rem; 
      margin: 15px 0; 
      font-weight: 700; 
      color: var(--white);
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .page-header .badge {
      background: var(--white);
      color: var(--primary);
      padding: 6px 18px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1px;
      display: inline-block;
      margin-bottom: 10px;
      text-transform: uppercase;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .header-subtitle { max-width: 800px; margin: 0 auto 30px; font-size: 1.1rem; color: rgba(255,255,255,0.9); }
    .header-actions { margin-bottom: 40px; }
    .btn-white { background: var(--white); color: var(--primary); padding: 12px 30px; border-radius: 50px; font-weight: 600; }
    .btn-white:hover { background: var(--secondary); color: var(--white); transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
    
    .breadcrumb { 
      font-size: 0.95rem; 
      margin-top: 15px; 
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
    }
    .breadcrumb a { color: rgba(255,255,255,0.9); text-decoration: none; transition: var(--transition); }
    .breadcrumb span { color: var(--white); }
    .breadcrumb a:hover { color: var(--white); text-decoration: underline; }

    .badge-primary { background: #eef5ff; color: var(--primary); }
    .underline { width: 60px; height: 4px; background: var(--secondary); margin: 20px auto; border-radius: 2px; }

    .services-grid { 
        display: grid; 
        grid-template-columns: repeat(3, 1fr); 
        gap: 30px; 
        margin-top: 50px; 
    }
    .service-card { 
        background: var(--white); 
        border-radius: 20px; 
        overflow: hidden; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.05); 
        transition: var(--transition);
        border: 1px solid #f0f4f8;
    }
    .service-card:hover { 
        transform: translateY(-15px); 
        box-shadow: 0 20px 40px rgba(10, 77, 162, 0.15); 
    }
    .service-img { position: relative; height: 240px; overflow: hidden; }
    .service-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .service-card:hover .service-img img { transform: scale(1.1); }
    .service-overlay { 
        position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(10, 77, 162, 0.6); 
        display: flex; align-items: center; justify-content: center; 
        opacity: 0; transition: var(--transition); 
    }
    .service-card:hover .service-overlay { opacity: 1; }
    .btn-icon { width: 50px; height: 50px; background: var(--white); color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }

    .service-content { padding: 40px 30px; position: relative; }
    .service-icon { 
        position: absolute; top: -35px; left: 30px; 
        width: 70px; height: 70px; background: var(--white); 
        border-radius: 15px; display: flex; align-items: center; 
        justify-content: center; font-size: 1.8rem; color: var(--primary); 
        box-shadow: 0 10px 25px rgba(10, 77, 162, 0.1);
        border: 1px solid #eef5ff;
    }
    .service-content h3 { font-size: 1.4rem; margin-bottom: 20px; color: #1a202c; }
    .service-content p { color: var(--text-grey); line-height: 1.6; margin-bottom: 25px; font-size: 0.95rem; }
    .btn-text { color: var(--primary); font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; }
    .btn-text:hover { color: var(--secondary); }

    /* Why Choose Section */
    .bg-dark-medical { background-color: #0d2137; }
    .text-white { color: var(--white); }
    .text-light { color: rgba(255,255,255,0.8); }
    .text-light-grey { color: #a0aec0; }
    .why-services-layout { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 40px; align-items: center; }
    
    .badge-outline { 
        border: 1px solid var(--secondary); 
        color: var(--secondary); 
        background: transparent; 
        margin-bottom: 15px; 
        display: inline-block;
        padding: 5px 12px;
        border-radius: 50px;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 1px;
    }
    .why-services-content h2 { font-size: 2.2rem; margin-bottom: 15px; line-height: 1.3; }
    .why-services-content .text-light { font-size: 0.95rem; line-height: 1.5; }
    .features-list { margin-top: 30px; display: grid; gap: 15px; }
    .feature-item { display: flex; gap: 12px; align-items: flex-start; }
    .feature-icon-circle { 
        width: 32px; height: 32px; background: rgba(26, 167, 236, 0.2); 
        color: var(--secondary); border-radius: 50%; display: flex; 
        align-items: center; justify-content: center; flex-shrink: 0;
        font-size: 0.8rem;
    }
    .feature-text h4 { font-size: 1.05rem; margin-bottom: 3px; }
    .feature-text p { font-size: 0.85rem; line-height: 1.4; margin: 0; }

    .why-services-visual { position: relative; display: flex; justify-content: flex-start; align-items: center; }
    .experience-box { position: relative; max-width: 400px; width: 100%; }
    .rounded-lg { border-radius: 15px; }
    .img-responsive { width: 100%; height: 420px; object-fit: cover; display: block; border-radius: 15px; box-shadow: 0 15px 30px rgba(0,0,0,0.3); }
    .floating-card { 
        position: absolute; bottom: 20px; right: -25px; left: auto;
        background: var(--white); padding: 15px 22px; 
        border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        text-align: center;
        border: 1px solid #f0f4f8;
        z-index: 2;
    }
    .floating-card .count { font-size: 1.5rem; font-weight: 800; color: var(--primary); line-height: 1; margin-bottom: 4px; }
    .floating-card .label { font-size: 0.7rem; font-weight: 700; color: #475467; text-transform: uppercase; }

    /* CTA Banner */
    .cta-banner { 
        background: linear-gradient(rgba(10, 77, 162, 0.5), rgba(10, 77, 162, 0.5)), url('/hero.png'); 
        background-size: cover; background-position: center; 
        padding: 80px 0; color: var(--white); 
    }
    .cta-content h2 { font-size: 2.5rem; color: var(--white); margin-bottom: 15px; }
    .cta-content p { font-size: 1.2rem; opacity: 0.9; margin-bottom: 30px; }
    .btn-lg { padding: 15px 40px; font-size: 1.1rem; }

    @media (max-width: 1024px) {
        .services-grid { grid-template-columns: repeat(2, 1fr); }
        .page-header h1 { font-size: 2.5rem; }
        .why-services-layout { grid-template-columns: 1fr 1fr; gap: 30px; }
        .floating-card { right: -10px; }
    }
    @media (max-width: 768px) {
        .services-grid { grid-template-columns: 1fr; }
        .why-services-layout { grid-template-columns: 1fr; gap: 40px; }
        .why-services-visual { order: -1; justify-content: center; }
        .experience-box { max-width: 100%; }
        .img-responsive { height: 350px; }
        .floating-card { right: 20px; left: auto; }
    }
  `]
})
export class ServicesComponent {
  services = [
    {
      id: 'patient-support',
      title: 'Patient Support & Consultations',
      icon: 'fa-user-nurse',
      image: 'hero.png', // Placeholder, but matches medical theme from home
      description: 'Anika Health Care is committed to helping patients connect with the right doctors based on their specific healthcare needs. Our platform simplifies the process of finding qualified medical professionals, scheduling consultations, and receiving expert medical guidance.'
    },
    {
      id: 'nursing-home',
      title: 'Nursing Home Support',
      icon: 'fa-hospital-user',
      image: 'lab-consumables.png',
      description: 'Anika Health Care provides dedicated support to nursing homes and healthcare institutions by connecting them with qualified and experienced doctors across various medical specialties.'
    },
    {
      id: 'coordination',
      title: 'End-to-End Healthcare Coordination',
      icon: 'fa-handshake-angle',
      image: 'poc-solutions.png',
      description: 'Our platform ensures smooth coordination between patients, doctors, and nursing homes. From appointment scheduling to consultation and follow-up support, we manage the entire healthcare communication process efficiently.'
    }
  ];

  features = [
    { title: 'Trusted healthcare network', desc: 'A vast network of verified doctors and hospitals.' },
    { title: 'Experienced medical professionals', desc: 'Expert consultants across multiple specialties.' },
    { title: 'Fast & reliable coordination', desc: 'Timely responses and efficient care pathways.' },
    { title: 'Technology-driven solutions', desc: 'Modern tools for seamless healthcare management.' }
  ];
}
