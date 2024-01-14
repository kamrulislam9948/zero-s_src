declare var google:any;

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import { NotifyService } from '../../../services/common/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { RegisterService } from '../../../services/authentication/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  user: any;
  loggedIn: any;
  passwordMatchError: string = '';

  type: string = 'password';
  type2: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  eyeIcon2: string = 'fa-eye-slash';

  data: any = {};
  @ViewChild('registerForm') registerForm!: NgForm; 

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private registerService: RegisterService,
    private socialAuthService: SocialAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '847336527526-up6n2lv2vhn5gnrt4inm0ce7qkj7otte.apps.googleusercontent.com',
      callback: (resp:any)=>
        this.handleLogin(resp)    
    });
  }

  //Register Method

  register(): void {
    if (this.data.password !== this.data.confirmPassword) {
      this.passwordMatchError = 'Password and Confirm Password do not match';
      return;
    }

    this.passwordMatchError = ''; // Clear existing error message

    this.authService.register(this.data)
      .subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.notifyService.message('User created successfully');
          this.registerForm.resetForm();
        },
        (error) => {
          console.error('Registration failed!', error);
          this.notifyService.message('User registration failed! Try again.', 'Close');
        }
      );
  }

  //Password Hide and Show

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  hideShowPass2() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon2 = 'fa-eye') : (this.eyeIcon2 = 'fa-eye-slash');
    this.isText ? (this.type2 = 'text') : (this.type2 = 'password');
  }

  handleLogin(response:any){
    if(response){
      //decode token
      const payload =this.decodeTocken(response.credential);
      //store in session
        sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      //nevigate to home/browse
      this.router.navigateByUrl('/home');
    }
  }
  private decodeTocken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }
}