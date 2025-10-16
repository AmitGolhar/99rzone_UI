import { Component } from '@angular/core';

declare var bootstrap:any
@Component({
  selector: 'app-crm-layout',
  templateUrl: './crm-layout.component.html',
  styleUrls: ['./crm-layout.component.css']
})
export class CrmLayoutComponent {
  menuOpen = false;

  closeSidebar(): void {
    const sidebar = document.getElementById('crmSidebar');
    if (sidebar && sidebar.classList.contains('show')) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar);
      bsOffcanvas?.hide();
    }
  }

    toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

}
