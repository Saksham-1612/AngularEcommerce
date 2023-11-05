import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router) {}
  menuType: string = 'default';
  sellerName: string = '';

  ngOnInit(): void {
    this.route.events.subscribe((data: any) => {
      if (data.url) {
        if (
          localStorage.getItem('seller-auth') &&
          data.url.includes('seller')
        ) {
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller-auth');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData.name;
          // console.log('In seller');
        } else {
          this.menuType = 'default';
          // console.log('Not in seller');
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller-auth');
    this.route.navigate(['/']);
  }
}
