import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  fullName = '';
  error = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.register(this.username, this.password, this.fullName).subscribe({
      next: () => { this.success = 'Registered — please login'; setTimeout(()=>this.router.navigate(['/login']),1000); },
      error: (err) => this.error = err.error?.error || 'Registration failed'
    });
  }
}
