import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  category: string = "";
  color: string = "";
  price: string = "";

  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

  onFilter(): void{
    const str = this.category+ " "+ this.color+ " " + this.price;
    this.filter.emit(str);
  }

}
