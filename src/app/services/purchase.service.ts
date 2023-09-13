// purchase-modal.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { PurchaseComponent } from '../components/purchase/purchase.component';
import { CartComponent } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private modalStateSubject = new Subject<boolean>();
  private price: number = 0;
  private bought: boolean = false;
  private priceUpdateSubject = new Subject<number>();

  constructor(private dialog:MatDialog) {}

  setBought(a:boolean){
    this.bought=a;
  }

  getBought(): boolean{
    return this.bought;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    this.price = price;
    this.priceUpdateSubject.next(price);
  }
  
  getPriceUpdateObservable(): Observable<number> {
    return this.priceUpdateSubject.asObservable();
  }

  openPurchaseModal() {
    const dialogRef = this.dialog.open(PurchaseComponent, {
      width: '400px', 
    });
  
    dialogRef.afterClosed().subscribe();
  }

  closePurchaseModal() {
    this.modalStateSubject.next(false);
  }

  getModalState() {
    return this.modalStateSubject.asObservable();
  }
}
