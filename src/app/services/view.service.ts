import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private subjectheaderlogin = new Subject<any>();
  private headerlogin!:boolean;

  constructor() { 
    const storedUser = localStorage.getItem('currUser');
    this.headerlogin = storedUser ? false : true;
  }

  headerLogin():void{
    this.headerlogin = !this.headerlogin;
    this.subjectheaderlogin.next(this.headerlogin);
  }

  onHeaderLogin():Observable<any>{
    return this.subjectheaderlogin.asObservable();
  }

}
