import { User, UserLogin } from './../data-types';
import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  constructor(
    private seller: SellerService,
    private router: Router,
    private toast: HotToastService
  ) {}
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
    this.toast.success('User signed up');
  }
  login(data: UserLogin): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Check your credentials ';
        this.toast.error('Login failed');
      } else {
        this.toast.success('User logged in successfully');
      }
    });
  }
}
