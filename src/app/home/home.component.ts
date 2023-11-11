import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];
  constructor(
    private product: ProductService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((result: any) => {
      console.log(result);
      this.popularProducts = result;
    });
    this.product.trendyProducts().subscribe((result: any) => {
      console.log(result);
      this.trendyProducts = result;
    });
  }
  toastAdd(msg: string): void {
    this.toast.success(msg + ' added to cart');
  }
}
