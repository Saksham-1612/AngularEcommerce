import { User, UserLogin } from './../data-types';
import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private router: Router) {}
  authError: string = '';
  ngOnInit(): void {
    const sellerAuth = localStorage.getItem('seller-auth');

    if (sellerAuth) {
      this.seller.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  signUp(data: User): void {
    this.seller.userSignUp(data);
  }
  login(data: UserLogin) {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Check your credentials ';
      }
    });
  }
}
