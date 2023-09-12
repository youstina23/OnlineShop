import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { Observable, map } from 'rxjs';
import { Product } from '../Product';
import { User } from '../User';
import { ViewService } from './view.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart!:Product[];
  updatedCart :number[] = [];

  constructor(private http: HttpClient, private userService: UserService, private productService: ProductService, private viewService:ViewService) {}

  getCart(): Observable<Product[]> {
    return this.productService.getProducts().pipe(
      map(allProducts => {
        const user = this.userService.getCurrentUserObj();
        if (user !== null) {
          const ids = user.cart;
          this.updatedCart = ids;
          this.cart = [];
          for (const id of ids) {
            const matchingProducts = allProducts.filter(product => product.id !== undefined && product.id === id);
            this.cart.push(...matchingProducts);
          }    
          return this.cart;
        }
        return [];
      })
    );
  }
  
  updateCart(addTrue:boolean, itemid: number): any{
    if(addTrue){
      this.viewService.changeCartEmpty(false);
      this.updatedCart.push(itemid);
    }
    else{
      this.updatedCart=[];
      if(itemid!==0){
        let found = false;
        for(const item of this.cart){
          if(item.id!==itemid || found){
            this.updatedCart.push(item.id? item.id:0 );
          }
          if(item.id===itemid && !found){
            found = true;
          }
        }
      }
      if(this.updatedCart.length===0){
        this.viewService.changeCartEmpty(true);
      }
    }
    const userUpdate = { 
      username: this.userService.getCurrentUserObj()?.username,
      role: this.userService.getCurrentUserObj()?.role,
      password: this.userService.getCurrentUserObj()?.password,
      name: this.userService.getCurrentUserObj()?.name,
      phone: this.userService.getCurrentUserObj()?.phone,
      email: this.userService.getCurrentUserObj()?.email,
      address: this.userService.getCurrentUserObj()?.address,
      cart: this.updatedCart
    };
    return userUpdate;
  }

  // buy() {
  //   const user = this.userService.getCurrentUserObj();
  //   this.viewService.changeCartEmpty(true);
  //   this.updatedCart=[];
  //   if (user) {
  //     const userUpdate = {
  //       username: user.username,
  //       role: 'blabla',
  //       password: user.password,
  //       name: user.name,
  //       phone: user.phone,
  //       email: user.email,
  //       address: user.address,
  //       cart: this.updatedCart,
  //     };
  //     this.userService.updateCurrUserCart(user.cart);
  //     const url = `${this.userService.apiUrl}/${user.id}`;
  //     return this.http.put<User>(url, userUpdate, httpOptions);
  //   }
  //   else{
  //     return null;
  //   }
  // }

  buy(){
    const url = `${this.userService.apiUrl}/${this.userService.getCurrentUserObj()?.id}`;
    const userUpdate = this.updateCart(false, 0);
    this.userService.updateCurrUserCart(this.updatedCart);
    return this.http.put<User>(url, userUpdate, httpOptions);
  }
  
  removeItem(itemid: number){
    const url = `${this.userService.apiUrl}/${this.userService.getCurrentUserObj()?.id}`;
    const userUpdate = this.updateCart(false, itemid);
    this.userService.updateCurrUserCart(this.updatedCart);
    return this.http.put<User>(url, userUpdate, httpOptions);
  }

  addItem(itemid:number){
    const url = `${this.userService.apiUrl}/${this.userService.getCurrentUserObj()?.id}`;
    const userUpdate = this.updateCart(true, itemid);
    this.userService.updateCurrUserCart(this.updatedCart);
    return this.http.put<User>(url, userUpdate, httpOptions);
  }

}
