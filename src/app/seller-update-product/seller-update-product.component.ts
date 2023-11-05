import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: Product | null = null;
  updateMessage: string | null = null;
  constructor(private route: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId &&
      this.product.getProductbyId(productId).subscribe((result) => {
        console.log(result.id);

        console.log(result);
        this.productData = result;
      });
  }

  updateProduct(data: Product) {
    this.product.updateProduct(data).subscribe(
      (result: any) => {
        this.updateMessage = 'Product updated successfully.';
      },
      (error: any) => {
        this.updateMessage = 'Failed to update the product.';
      }
    );
    setTimeout(() => {
      this.updateMessage = null;
    }, 2000);
  }
}
