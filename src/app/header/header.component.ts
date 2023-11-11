import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: Router, private product: ProductService) {}
  isMenuOpen: boolean = false;
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | Product[];
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
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.warn(element.value);
      this.product.searchProducts(element.value).subscribe((result: any) => {
        // console.log(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  submitSearch(value: string) {
    console.log(value);
    this.route.navigate([`/search/${value}`]);
  }

  redirectToDetails(id: Number) {
    this.route.navigate([`/details/` + id]);
  }
}
