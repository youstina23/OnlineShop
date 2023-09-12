import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  card:boolean | null=null;
  price!:number;
  msg!:string;
  addedcash:boolean = false;
  cardno!:string | null;
  cardexp!:string | null ;
  cardcvv!:string | null;

  constructor(public dialogRef:MatDialogRef<PurchaseComponent>, private cart:CartComponent, private cartService:CartService){
    // this.price= this.cart.price;
  }

  ngOnInit(): void {
    // console.log(this.cart.price);
    // this.price= this.cart.price;
  }
  
  close():void{
    this.dialogRef.close('Buy');
  }

  confirmBuy():void{
    if(this.card===null){
      alert("Please choose your desired method of payment");
      return;
    }
    if(!this.card){
      alert("Congratulations! Track your order through the email that's been sent");
      this.cartService.buy();
      this.cart.products=this.cartService.getCart();
      this.cart.clearPrice();
      this.close();
    }
    else{
      if(this.cardno===null || this.cardexp===null || this.cardcvv===null){
        alert("Please enter all required fields");
      }
      else{
        const numLang = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/;
        const cvvLang = /^[0-9]{3,4}$/;
        const expLang = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if(!numLang.test(this.cardno)){
          alert("Please enter a valid card number");
        }
        else{
          if(!cvvLang.test(this.cardcvv)){
            alert("Please enter the correct CVV");
          }
          else{
            if(!expLang.test(this.cardexp)){
              alert("Please enter the correct expiration date");
            }
            else{
              alert("Congratulations! Track your order through the email that's been sent");
              this.close();
              this.cartService.buy();
              this.cart.products=this.cartService.getCart();
              this.cart.clearPrice();
              this.cardno=null;
              this.cardcvv=null;
              this.cardexp=null;
              this.card=null;
            }
          }
        }
      }
    }
  }

  bycard(a: boolean){
    if(!a && !this.addedcash){
      this.addedcash=true;
      this.price+=5;
    }
    if(a && this.addedcash){
      this.price-=5;
      this.addedcash=false;
      
    }
    this.msg = a?'Free Delivery':'$5.00 Extra Fee';
    this.card=a;
  }
}
