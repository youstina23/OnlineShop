import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../User';
import { UserService } from '../../services/user.service';
import { switchMap } from 'rxjs';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string='';
  password: string='';
  
  user: User | null=null;

  constructor(private router: Router, private userService: UserService, private viewService: ViewService){}

  getUserService(): UserService{
    return this.userService;
  }

  getViewService(): ViewService{
    return this.viewService;
  }

  ngOnInit(): void {}

  login() {
    if (this.username === '' || this.password === '') {
      alert('Please enter required fields');
    } else {
      this.userService.isUser(this.username).subscribe(exists => {
        if (exists) {
          this.userService.getUser(this.username).pipe(
            switchMap(user => {
              this.user = user;
              return this.userService.checkPass(this.user, this.password);
            })
          ).subscribe(rightpass => {
            if (rightpass) {
              this.userService.setCurrentUser(this.user);
              this.router.navigate(['/home']);
            } else {
              alert('Wrong Password');
              this.userService.deleteCurrentUser();
              this.user = null;
            }
          });
        } else {
          alert('User not found');
          this.userService.deleteCurrentUser();
          this.user = null;
        }
      });
    }
  }

  openForgotPassForm(){
    this.viewService.changeForgotPassStatus();
    this.viewService.onForgotPassChange();
  }

}
