import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  popularProducts: undefined | Product[];
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((result: any) => {
      console.log(result);
      this.popularProducts = result;
    });
  }
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
