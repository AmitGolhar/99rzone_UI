import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'w3realestateUI';
  showHeader = false;

   constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const token = localStorage.getItem('auth_token');
      const hideRoutes = ['/login', '/register'];
      this.showHeader = !!token && !hideRoutes.includes(this.router.url);
    });
  }
    
 

}
