import { Component, OnInit, Input} from '@angular/core';
import {Product} from '../../Product';
import {ProductService} from '../../services/product.service'
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  @Input() products: Product[] = [];
  
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
  }

  addItem(product:Product){
    const id =product.id;
    if(id){
      this.cartService.addItem(id).subscribe(() => {
        alert("Item Added!");
      });
    }
  }
}
