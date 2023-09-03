import { Component } from '@angular/core';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent {

  email: string = '';

  constructor(private viewService: ViewService){}

  submitForgotPass(){
    if(this.email!==''){
      this.viewService.changeForgotPassStatus();
      this.viewService.onForgotPassChange();
      alert('An email has been sent to you with further instructions');
    }else{
      alert("Please enter the required field");
    }
    
  }

}
