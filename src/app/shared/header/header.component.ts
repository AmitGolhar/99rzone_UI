import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
declare var bootstrap: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  navItems = [
    { label: 'Buy', link: '/buy' },
    { label: 'Rent', link: '/rent' },
    { label: 'Commercial', link: '/commercial' },
    { label: 'Post Property', link: '/post-property' },
    { label: 'Check On Map', link: '/check_on_map' },
    { label: 'CRM', link: '/crm' },
    //  { label: 'Excel Upload', link: '/excel-upload' },
    { label: 'Our Pricings', link: '/pricing' },
  ];

  constructor(private router: Router, private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
  closeNavbar(): void {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse =
        bootstrap.Collapse.getInstance(navbar) ||
        new bootstrap.Collapse(navbar);
      bsCollapse.hide();
    }
  }
}
