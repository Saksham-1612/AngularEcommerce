export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Product {
  name: string;
  price: number;
  color: string;
  desc: string;
  image: string;
  id: number;
}
