import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product, User, UserLogin } from '../data-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject(false);
  isLoginError = new EventEmitter(false);
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: User) {
    let result = this.http
      .post('http://localhost:3000/seller', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller-auth', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        // console.warn(result);
      });
  }

  userLogin(data: UserLogin) {
    console.log(data);
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        {
          observe: 'response',
        }
      )
      .subscribe((result: any) => {
        // console.log(result);
        if (result && result.body && result.body.length) {
          this.isSellerLoggedIn.next(true);
          console.warn('Logged in successfully');
          localStorage.setItem('seller-auth', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          console.log('Logged in failed');
          this.isLoginError.emit(true);
        }
      });
  }
}
