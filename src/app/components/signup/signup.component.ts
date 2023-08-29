import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../User';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  username: string='';
  password: string='';
  confirmpassword: string='';
  name: string='';
  email: string='';
  phone!: number;
  address: string='';
  emailLang = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneLang = /^1\d{9}$/;

  constructor(private router: Router, private userService: UserService){}
  
  ngOnInit(): void {}

  signup(){
    if(this.username==='' || this.password==='' || this.confirmpassword==='' || this.name==='' || this.email==='' || this.phone===null || this.address===''){
      alert('Please enter all required fields');
    }
    else{
      this.userService.isUser(this.username).subscribe(used=>{
        if(used){
          alert('Username already taken');
        }
        else{
          if(this.password!==this.confirmpassword){
            alert('Please enter passwords carefully');
          }
          else{
            if(!this.emailLang.test(this.email)){
              alert('Please enter a valid email address');
            }
            else{
              if(!this.phoneLang.test(this.phone.toString())){
                alert('Please enter a valid phone number, omitting the 0')
              }
              else{
                const elgedid: User = {
                  username: this.username,
                  role: "user",
                  password: this.password,
                  name: this.name,
                  phone: this.phone,
                  email: this.email,
                  address: this.address 
                }
                this.userService.addUser(elgedid).subscribe();
                this.userService.setCurrentUser(elgedid);
                // localStorage.setItem('currUser', JSON.stringify(elgedid));
                alert('Welcome to our community!');
                this.router.navigate(['/home']);
              }
            }
          }
        }
      })
    }
  }
}
