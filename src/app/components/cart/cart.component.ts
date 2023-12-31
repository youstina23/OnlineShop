import { Component,Input, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Product } from 'src/app/Product';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { ViewService } from 'src/app/services/view.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  products!: Observable<Product[]>;
  price: number = 0;
  priceUpdateSubscription!: Subscription;

  constructor(private cartService: CartService, private userService: UserService, private viewService:ViewService, private purchaseService: PurchaseService) {
    
  }

  ngOnInit(): void {
    this.products = this.cartService.getCart();
    this.products.subscribe(productss => {
      this.price = productss.reduce((total, product) => total + product.price, 0);
      this.purchaseService.setPrice(this.price);
    });
    
  }

  ngOnDestroy(): void {
    if (this.priceUpdateSubscription) {
      this.priceUpdateSubscription.unsubscribe();
    }
  }

  getViewService(): ViewService{
    return this.viewService;
  }

  deleteItem(product: Product) {
    const id = product.id;
    if (id) {
      this.cartService.removeItem(id).subscribe(() => {
        this.products = this.products.pipe(
          map((items) => {
            const indexToRemove = items.findIndex((item) => item.id === id);
            if (indexToRemove !== -1) {
              items.splice(indexToRemove, 1);
            }
            return items;
          })
        );
      });
    }
    this.products.subscribe((productss) => {
      this.price = productss.reduce((total, product) => total + product.price, 0);
      this.purchaseService.setPrice(this.price);
    });
    this.products = this.cartService.getCart();
  }
  
  buy(){
    if(this.viewService.isCartEmpty()){
      alert("Your cart is empty");
    }
    else{
      this.purchaseService.openPurchaseModal();
      this.subscribePrice();
    }
  }

  subscribePrice():number{
    this.priceUpdateSubscription = this.purchaseService.getPriceUpdateObservable().subscribe(
      (updatedPrice) => {
        this.price = updatedPrice;
      }
    );
    return this.price;
  }

}
