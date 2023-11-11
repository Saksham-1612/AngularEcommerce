import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productFound: Product | undefined;
  productQuantity: number = 1;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId &&
      this.product.getProductbyId(productId).subscribe((result) => {
        console.warn(result);
        this.productFound = result;
      });
  }
  handleQuantity(ops: string) {
    if (ops === 'min') {
      if (this.productQuantity > 1) {
        this.productQuantity = this.productQuantity - 1;
      }
    }
    if (ops === 'plus') {
      this.productQuantity = this.productQuantity + 1;
    }
  }
}
