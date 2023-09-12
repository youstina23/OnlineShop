import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ViewService } from '../../services/view.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {


  constructor(private userService: UserService, private viewService: ViewService){}

  getUserService(): UserService{
    return this.userService;
  }

  getViewService(): ViewService{
    return this.viewService;
  }

  contactus(): void{
    const email = 'support@onlineshop.com';
    const textarea = document.createElement('textarea');
    textarea.value = email;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('er');
    alert('Our email address, support@onlineshop.com, has been copied to your clipboard, email us and we will be ready to assist');
  }

}
