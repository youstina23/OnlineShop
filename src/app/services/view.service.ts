import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private subjectLoggedIn = new Subject<any>();
  private loggedIn!:boolean;

  private subjectForgotPass = new Subject<any>();
  private forgotPass:boolean = false;

  private cartEmpty = true;

  constructor(private userService: UserService) { 
    const storedUser = userService.getCurrentUserObj();
    
    if(storedUser===null){
      this.loggedIn = false;
    }
    else{
      this.loggedIn=true;
    }   
  }

  getForgotPass(): boolean{
    return this.forgotPass;
  }

  changeloginStatus():void{
    this.loggedIn = !this.loggedIn;
    this.subjectLoggedIn.next(this.loggedIn);
  }
  onLoginChange():Observable<any>{
    return this.subjectLoggedIn.asObservable();
  }

  changeForgotPassStatus():void{
    this.forgotPass = !this.forgotPass;
    this.subjectForgotPass.next(this.forgotPass);
  }
  
  onForgotPassChange():Observable<any>{
    return this.subjectForgotPass.asObservable();
  }

  changeCartEmpty(state: boolean):void{
    this.cartEmpty=state;
  }

  isCartEmpty():boolean{
    return this.cartEmpty;
  }

}
