import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Resto';
  showHeader = true;
  showFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentPath = event.urlAfterRedirects.split('?')[0];
        console.log(currentPath);
        
        if (['/', '/signup', '/login', '/chef', '/menu', '/mesTables', '/table', '/table/:id', '/add-plat', '/add-plat/:id', '/mesTables', '/add-chef', '/add-chef/:id', '/admin/chefs', '/admin/plats', '/admin/users', '/admin/tables', '/admin'].includes(currentPath)) {
          this.showHeader = true;
          this.showFooter = true;
        } else {
          this.showHeader = false;
          this.showFooter = false;
        }
      }
    });
  }
  
  
}

