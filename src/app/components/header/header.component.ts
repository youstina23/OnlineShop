import { Component, OnInit} from '@angular/core';
import {User} from '../../User';
import {Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  title:string = 'ONLINE SHOP';

  constructor(private userService: UserService, private router: Router, private viewService: ViewService){}
 
  ngOnInit(): void {

  }

  getUserService(): UserService{
    return this.userService;
  }

  getViewService(): ViewService{
    return this.viewService;
  }

  logout(){
    console.log("boo");
    this.userService.deleteCurrentUser();
    this.router.navigate(['/login']);
  }
}
