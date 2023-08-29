import { Component, OnInit } from '@angular/core';
import {Product} from '../../Product';
import {ProductService} from '../../services/product.service'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  products: Product[]=[];

  constructor( private productsService: ProductService){
  }

  ngOnInit():void{
    this.productsService.getProducts().subscribe((products)=>(this.products=products));
  }

}
