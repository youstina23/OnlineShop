import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../Product';
import { Cart } from '../Cart';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrlCarts = 'http://localhost:5000/carts';
  private apiUrlUsers = 'http://localhost:5000/users';
  private apiUrlProducts = 'http://localhost:5000/products';

  constructor(private http: HttpClient) {}


}
