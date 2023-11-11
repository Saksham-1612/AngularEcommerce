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

    return this.http.post('https://ecommerce-ty16.onrender.com/products', data);
  }

  getProduct() {
    return this.http.get<Product[]>(
      'https://ecommerce-ty16.onrender.com/products'
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(
      `https://ecommerce-ty16.onrender.com/products/${id}`
    );
  }

  getProductbyId(id: string) {
    return this.http.get<Product>(
      `https://ecommerce-ty16.onrender.com/products/${id}`
    );
  }

  updateProduct(product: Product) {
    console.log(product);

    console.log(product.id);
    return this.http.put(
      `https://ecommerce-ty16.onrender.com/products/${product.id}`,
      product
    );
  }

  popularProducts() {
    return this.http.get<Product[]>(
      'https://ecommerce-ty16.onrender.com/products?_limit=4'
    );
  }

  trendyProducts() {
    return this.http.get<Product[]>(
      'https://ecommerce-ty16.onrender.com/products?_limit=8'
    );
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(
      `https://ecommerce-ty16.onrender.com/products?q=${query}`
    );
  }
}
