import { Product } from './../data-types';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private router: Router) {}

  addProduct(data: Product) {
    console.log(data);
    console.warn('service called');

    return this.http.post('http://localhost:3000/products', data);
  }

  getProduct() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProductbyId(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: Product) {
    console.log(product);

    console.log(product.id);
    return this.http.put(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  popularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=4');
  }
}
