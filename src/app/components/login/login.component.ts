import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string='';
  password: string='';
  
  user: User | null=null;

  constructor(private router: Router, private userService: UserService){}

  ngOnInit(): void {}

  login(){
    if(this.username==='' || this.password===''){
       alert('Please enter required fields');
    }
    else{
      this.userService.isUser(this.username).subscribe(exists=>{
      if(exists){
        this.userService.getUser(this.username).subscribe(user=>{this.user=user;});
        this.userService.checkPass(this.user, this.password).subscribe(rightpass=>{
          if(rightpass){
            this.userService.setCurrentUser(this.user);
            // localStorage.setItem('currUser', JSON.stringify(this.user));
            this.router.navigate(['/home']);
          }
          else{
            alert('Wrong Password');
            this.userService.deleteCurrentUser();
            this.user=null;
          }
        });
        }
      else{
        alert('User not found');
        this.userService.deleteCurrentUser();
        this.user=null;
        }
      })
    }
        
  }

}
