import { Component, Output, EventEmitter} from '@angular/core';
import { Product } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  term: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch(): void {
    // console.log(this.term);
    this.search.emit(this.term);
  }

}

