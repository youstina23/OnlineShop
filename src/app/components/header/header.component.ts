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

  constructor(public userServiceH: UserService, private router: Router, public viewService: ViewService){}
 
  ngOnInit(): void {

  }

  logout(){
    console.log("boo");
    this.userServiceH.deleteCurrentUser();
    this.router.navigate(['/login']);
  }
}
