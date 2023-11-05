import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from './../data-types';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined = undefined;

  constructor(private router: Router, private product: ProductService) {}

  addProduct(data: Product) {
    this.product.addProduct(data).subscribe((result: any) => {
      if (result) {
        this.addProductMessage = 'Product added successfully';
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
      }, 1000);
    });
  }
}
