import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap:any
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private router: Router) {}


   logout(): void {
    // 🧹 Clear stored tokens and user info
    localStorage.removeItem('authToken');
    localStorage.removeItem('user'); // if you store user info

    // 🔐 Redirect to login
    this.router.navigate(['/login']);

    // Optional: show a message
    console.log('User logged out successfully');
  }
 closeNavbar(): void {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbar) || new bootstrap.Collapse(navbar);
      bsCollapse.hide();
    }
  }
}
