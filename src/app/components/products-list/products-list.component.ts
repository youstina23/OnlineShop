import { Component, OnInit, Input} from '@angular/core';
import {Product} from '../../Product';
import {ProductService} from '../../services/product.service'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  @Input() products: Product[] = [];
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.products.length);
  }
}
