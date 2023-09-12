import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/Product';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('3ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
  
})

export class CartItemComponent implements OnInit{
  @Input() product!:Product;
  @Output() deleteItem: EventEmitter<Product> = new EventEmitter();
  faTimes = faTrashCan;
  removed = false;

  constructor(private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    
  }

  onDelete(product:Product){
    this.removed = true;
    this.deleteItem.emit(product);
    this.cdr.detectChanges();
  }

}
