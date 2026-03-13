import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <main>
      <!-- Appointment Hero - Centered and Professional -->
      <section class="relative h-[450px] flex items-center justify-center overflow-hidden bg-background-dark text-center">
        <div class="absolute inset-0 pointer-events-none">
          <img src="poc-solutions.png" 
               alt="Appointment Banner" 
               class="w-full h-full object-cover opacity-60">
          <div class="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/70 to-background-dark/90"></div>
        </div>
        
        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center gap-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
            <span class="material-symbols-outlined text-sm">event_available</span> Secure Your Consultation
          </div>
          
          <h1 class="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            BOOK AN <span class="text-primary">APPOINTMENT</span>
          </h1>
          
          <p class="text-md text-slate-300 leading-relaxed max-w-2xl font-medium">
            Schedule a consultation with experienced healthcare professionals <br class="hidden md:block"/> and receive the medical care you need.
          </p>
          
          <nav class="flex justify-center items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest pt-2">
            <a routerLink="/" class="hover:text-primary transition-colors">Home</a>
            <span class="w-1 h-1 rounded-full bg-white/20"></span>
            <span class="text-white">Appointment</span>
          </nav>
        </div>
      </section>

      <!-- Appointment Form Section -->
      <section class="section-padding">
        <div class="container">
          <div class="appointment-wrapper">
            <div class="grid-2 no-gap">
              <!-- Sidebar Info -->
              <div class="appointment-info-sidebar">
                <div class="sidebar-content">
                  <span class="small-badge">WE ARE HERE FOR YOU</span>
                  <h2>Available Consultations</h2>
                  <p>Our specialists are available for both in-person and virtual consultations during the following hours:</p>
                  
                  <div class="timing-list">
                    <div class="timing-item">
                      <span class="day">Monday – Friday</span>
                      <span class="time">9:00 AM – 6:00 PM</span>
                    </div>
                    <div class="timing-item">
                      <span class="day">Saturday</span>
                      <span class="time">10:00 AM – 4:00 PM</span>
                    </div>
                    <div class="timing-item text-danger">
                      <span class="day">Sunday</span>
                      <span class="time">Emergency Only</span>
                    </div>
                  </div>

                  <div class="contact-card mt-auto">
                    <div class="icon-box"><i class="fas fa-headset"></i></div>
                    <div class="text-box">
                      <p>Need help booking?</p>
                      <strong>+91 98765 43210</strong>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Main Form -->
              <div class="appointment-form-container">
                <div class="form-card" *ngIf="!submitted">
                  <h3>Fill in the Details</h3>
                  <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()" class="appointment-form">
                    <div class="form-row">
                      <div class="form-group">
                        <label>Full Name</label>
                        <div class="input-wrapper">
                          <i class="fas fa-user-md"></i>
                          <input type="text" formControlName="fullName" placeholder="Your name">
                        </div>
                        <small class="error" *ngIf="isInvalid('fullName')">Name is required</small>
                      </div>
                      <div class="form-group">
                        <label>Email Address</label>
                        <div class="input-wrapper">
                          <i class="fas fa-envelope"></i>
                          <input type="email" formControlName="email" placeholder="you@example.com">
                        </div>
                        <small class="error" *ngIf="isInvalid('email')">Valid email is required</small>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group">
                        <label>Phone Number</label>
                        <div class="input-wrapper">
                          <i class="fas fa-phone"></i>
                          <input type="tel" formControlName="phone" placeholder="+91 XXXX XXX XXX">
                        </div>
                        <small class="error" *ngIf="isInvalid('phone')">Valid phone is required</small>
                      </div>
                      <div class="form-group">
                        <label>Department</label>
                        <div class="input-wrapper">
                          <i class="fas fa-hospital"></i>
                          <select formControlName="department">
                            <option value="">Select Department</option>
                            <option *ngFor="let dept of departments" [value]="dept">{{dept}}</option>
                          </select>
                        </div>
                        <small class="error" *ngIf="isInvalid('department')">Please select a department</small>
                      </div>
                    </div>

                    <div class="form-group full">
                      <label>Preferred Date</label>
                      <div class="input-wrapper">
                        <i class="fas fa-calendar-alt"></i>
                        <input type="date" formControlName="preferredDate">
                      </div>
                      <small class="error" *ngIf="isInvalid('preferredDate')">Please select a date</small>
                    </div>

                    <div class="form-group full">
                      <label>Medical Concerns / Notes</label>
                      <div class="input-wrapper">
                        <textarea formControlName="notes" rows="4" placeholder="Please describe your health concern or any additional information."></textarea>
                      </div>
                    </div>

                    <div class="form-submit">
                      <button type="submit" class="btn btn-primary btn-block" [disabled]="loading">
                        <span *ngIf="!loading">Book Appointment Now</span>
                        <span *ngIf="loading"><i class="fas fa-spinner fa-spin"></i> Processing...</span>
                      </button>
                    </div>
                  </form>
                </div>

                <!-- Success Message -->
                <div class="success-card" *ngIf="submitted">
                  <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                  <h3>Request Submitted Successfully!</h3>
                  <p>Thank you for choosing Anika Health Care. Your appointment request has been received. Our team will contact you shortly to confirm your consultation time.</p>
                  <div class="success-actions">
                    <button class="btn btn-outline" (click)="resetForm()">Book Another</button>
                    <a routerLink="/" class="btn btn-primary">Return Home</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .appointment-wrapper {
        max-width: 800px;
        margin: 0 auto;
        background: var(--white);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 15px 35px rgba(10, 77, 162, 0.08);
        border: 1px solid #e1effe;
    }

    .no-gap { gap: 0 !important; }

    .appointment-info-sidebar {
        background: #f8fbff;
        padding: 30px 25px;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #e1effe;
    }
    .small-badge { font-size: 0.65rem; font-weight: 700; color: var(--primary); letter-spacing: 1px; margin-bottom: 10px; display: block; }
    .appointment-info-sidebar h2 { font-size: 1.4rem; margin-bottom: 12px; color: #101828; }
    .appointment-info-sidebar p { color: var(--text-grey); font-size: 0.85rem; line-height: 1.5; margin-bottom: 25px; }

    .timing-list { display: grid; gap: 15px; }
    .timing-item { display: flex; flex-direction: column; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e0; }
    .timing-item:last-child { border: none; }
    .day { font-weight: 700; color: #1a202c; font-size: 0.85rem; }
    .time { font-size: 0.8rem; color: var(--text-grey); }
    .text-danger .time { color: #e53e3e; font-weight: 600; }

    .contact-card { 
        display: flex; gap: 10px; align-items: center; 
        background: var(--white); padding: 12px; 
        border-radius: 10px; border: 1px solid #e2e8f0;
        margin-top: 25px;
    }
    .icon-box { 
        width: 38px; height: 38px; background: #eef5ff; 
        color: var(--primary); border-radius: 8px; 
        display: flex; align-items: center; justify-content: center; font-size: 1rem;
    }
    .text-box p { margin-bottom: 0 !important; font-size: 0.75rem !important; }
    .text-box strong { font-size: 0.9rem; color: var(--primary); }

    .appointment-form-container { padding: 30px 25px; }
    .form-card h3 { font-size: 1.3rem; margin-bottom: 20px; color: #101828; }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
    .form-group { display: flex; flex-direction: column; margin-bottom: 15px; }
    .form-group.full { margin-bottom: 15px; }
    .form-group label { font-size: 0.8rem; font-weight: 600; color: #4a5568; margin-bottom: 6px; }
    .input-wrapper { position: relative; }
    .input-wrapper i { position: absolute; left: 12px; top: 11px; color: var(--primary); opacity: 0.7; font-size: 0.85rem; }
    .input-wrapper input, .input-wrapper select, .input-wrapper textarea {
        width: 100%; padding: 8px 12px 8px 35px; 
        border: 1px solid #edf2f7; border-radius: 8px;
        font-size: 0.85rem; background: #fcfdfe; transition: var(--transition);
        font-family: inherit;
    }
    .input-wrapper textarea { padding-left: 12px; resize: none; }
    .input-wrapper input:focus, .input-wrapper select:focus, .input-wrapper textarea:focus {
        border-color: var(--primary); outline: none; background: var(--white); box-shadow: 0 0 0 3px rgba(10, 77, 162, 0.05);
    }
    .error { color: #e53e3e; font-size: 0.65rem; margin-top: 4px; font-weight: 600; }

    .form-submit { margin-top: 20px; }
    .btn-block { width: 100%; padding: 12px; border-radius: 8px; font-weight: 700; letter-spacing: 0.5px; font-size: 0.9rem; }

    /* Success Message */
    .success-card { text-align: center; padding: 40px 0; }
    .success-icon { font-size: 5rem; color: #2ecc71; margin-bottom: 25px; animation: scaleUp 0.5s ease-out; }
    @keyframes scaleUp { 
        0% { transform: scale(0.5); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }
    .success-card h3 { font-size: 2rem; margin-bottom: 20px; color: #101828; }
    .success-card p { color: var(--text-grey); font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; }
    .success-actions { display: flex; gap: 20px; justify-content: center; }

    @media (max-width: 991px) {
        .grid-2 { grid-template-columns: 1fr; }
        .appointment-info-sidebar { border-right: none; border-bottom: 1px solid #e1effe; }
        .page-header h1 { font-size: 2.8rem; }
    }
    @media (max-width: 600px) {
        .form-row { grid-template-columns: 1fr; }
        .appointment-form-container { padding: 40px 25px; }
        .success-actions { flex-direction: column; }
    }
  `]
})
export class AppointmentComponent {
  appointmentForm: FormGroup;
  loading = false;
  submitted = false;

  departments = [
    'General Medicine',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Other'
  ];

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{10,15}$/)]],
      department: ['', Validators.required],
      preferredDate: ['', Validators.required],
      notes: ['']
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.appointmentForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.loading = true;
      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        this.submitted = true;
        console.log('Form data:', this.appointmentForm.value);
      }, 1500);
    } else {
      Object.keys(this.appointmentForm.controls).forEach(key => {
        const control = this.appointmentForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  resetForm() {
    this.submitted = false;
    this.appointmentForm.reset({
      department: ''
    });
  }
}
