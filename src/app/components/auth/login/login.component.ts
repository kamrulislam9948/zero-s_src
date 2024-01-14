declare var google: any;

import { Component, OnInit, inject } from '@angular/core';
import { LoginModel } from '../../../models/authentication/login-model';
import { LoginService } from '../../../services/authentication/login.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user: any;
  loggedIn: any;
  passwordValidationError: string = '';

  private route = inject(Router);

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  data: LoginModel = {};
  returnUrl: string = "navbar";

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loginService.getEmitter().subscribe(x => {
      if (x === "login") {
        this.redirectBasedOnRole();
      }
      if (x === "logout") {
      }
    });
  }
  // Getter method to expose loginService
  get publicLoginService(): LoginService {
    return this.loginService;
  }
  login(f: NgForm) {
    console.log(this.data);
    this.loginService.clearPasswordValidationError(); // Clear existing error message
    this.loginService.login(this.data);
  }

  userProfile: any;


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      q => {
        this.returnUrl = q['returnUrl'] ?? '/dashboard';
      }
    );
    google.accounts.id.initialize({
      client_id:'847336527526-up6n2lv2vhn5gnrt4inm0ce7qkj7otte.apps.googleusercontent.com',
      callback:(resp: any)=>
      this.handleLogin(resp)
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',
      size:'large',
      shape: 'pill',
      width: 280
    })
  };

  private redirectBasedOnRole() {
    if (this.authService.roleMatch(['Admin'])) {
      this.router.navigateByUrl('/ggc-home');
    }
    else if (this.authService.roleMatch(['User'])) {
      this.router.navigateByUrl('/ggc-home');
    }
    else if (this.authService.roleMatch(['SalesUser'])) {
      this.router.navigateByUrl('/salesUser-dashboard');
    }
    else {
      this.router.navigateByUrl('/default');
    }
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  private decodeToken(tocken : string){
    return JSON.parse(atob(tocken.split(".")[1]));
  }
  handleLogin(reponse: any){
    if(reponse){
      const payLoad =this.decodeToken(reponse.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      this.route.navigateByUrl('ggc-home')
    }
  }
}