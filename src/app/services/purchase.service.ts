// purchase-modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { PurchaseComponent } from '../components/purchase/purchase.component';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private isOpen = false;
  private modalStateSubject = new Subject<boolean>();

  constructor(private dialog:MatDialog) {}

  openPurchaseModal() {
    const dialogRef = this.dialog.open(PurchaseComponent, {
      width: '400px', // Adjust the width as needed
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  closePurchaseModal() {
    this.isOpen = false;
    this.modalStateSubject.next(false);
  }

  getModalState() {
    return this.modalStateSubject.asObservable();
  }
}
