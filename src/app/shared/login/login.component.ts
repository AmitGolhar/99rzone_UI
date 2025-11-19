import { Component } from '@angular/core';
 
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/crm']),
      error: (err) => this.error = err.error?.error || 'Login failed'
    });
  }
}
