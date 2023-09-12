import { Component,OnInit } from '@angular/core';
import { Product } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  allproducts: Product[] = [];
  matches = true;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.productService.getProducts().subscribe((products) => {
      this.allproducts = products;
    });
    this.matches=true;
  }

  updateSearchedProducts(term: string){
    if(term===''){
      this.showAllProducts();
    }
    else{
      this.products = this.products.filter((product) =>
         product.name.toLowerCase().includes(term.toLowerCase())
      );
      this.matches = this.products.length!==0;
    }
  }

  showAllProducts():void{
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.matches=true;
  }

  updateFilteredProducts(filter: string){
    if(filter===""){
      this.showAllProducts();
    }
    else{
      const filters = filter.split(" ");
    const category = filters[0];
    const color = filters[1];
    const price = filters[2];
    let res: Product[]=[];
    if(category==='' && color==='' && price===''){
      this.showAllProducts();
    }
    else {
      res = this.allproducts.filter(product=> {
        const yescategory = category === '' || product.category===category;
        const yescolor = color ==='' || product.color===color;
        const yesprice = price === '' || (
          (price === 'low' && product.price >= 1 && product.price <= 20) ||
          (price === 'medium' && product.price >= 21 && product.price <= 40) ||
          (price === 'high' && product.price >= 41 && product.price <= 60)
        )
        return yescategory && yescolor && yesprice;
      }
      )
    this.products=res;
    this.matches = this.products.length!==0;
    }
    }
    
  }


}
