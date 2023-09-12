import { Component } from '@angular/core';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent {

  email: string = '';
  emailLang = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private viewService: ViewService){}

  submitForgotPass(){
    if(this.email!==''){
      if(this.emailLang.test(this.email)){
        this.viewService.changeForgotPassStatus();
        this.viewService.onForgotPassChange();
        alert('An email has been sent to you with further instructions');
      }
      else{
        this.email='';
        alert('Please enter a valid email address');
      }
      
    }else{
      alert("Please enter the required field");
    }
    
  }

}
