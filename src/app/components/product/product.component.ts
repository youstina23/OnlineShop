import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Product} from '../../Product';
import { UserService } from '../../services/user.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit{
  @Input() product!: Product;
  @Output() addItem: EventEmitter<Product> = new EventEmitter();
  
  constructor(private userService: UserService, private viewService: ViewService) {}

  getUserService(): UserService{
    return this.userService;
  }

  getViewService(): ViewService{
    return this.viewService;
  }

  ngOnInit(): void{}

  onAdd(product:Product){
    this.addItem.emit(product);
  }
}
