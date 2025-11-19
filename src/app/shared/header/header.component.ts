import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap:any
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navItems = [
  { label: 'Buy', link: '/buy' },
  { label: 'Rent', link: '/rent' },
  { label: 'Commercial', link: '/commercial' },
  { label: 'Post Property', link: '/post-property' },
  { label: 'Check On Map', link: '/check_on_map' },
  { label: 'CRM', link: '/crm' },
   { label: 'Excel Upload', link: '/excel-upload' },
    { label: 'Out Pricings', link: '/pricing' },

];


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
