import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ViewService } from '../../services/view.service';

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

}
