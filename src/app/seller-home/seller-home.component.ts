import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  productMessage: string | undefined;
  icon = faTrash;
  editIcon = faEdit;
  constructor(private product: ProductService) {}

  List(): void {
    this.product.getProduct().subscribe((result: any) => {
      // console.log(result);
      this.productList = result;
    });
  }

  ngOnInit(): void {
    this.List();
  }

  deleteProduct(id: number): void {
    console.log('test', id);
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Deleted Successfully';
      }
      setTimeout(() => {
        this.productMessage = undefined;
      }, 2000);
      this.List();
      console.log(result);
    });
  }
}
