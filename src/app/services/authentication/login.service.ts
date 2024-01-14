import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../models/authentication/user-model';
import { LoginModel } from '../../models/authentication/login-model';
import { NotifyService } from '../common/notify.service';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  passwordValidationError: string = '';

  currentUserSubject: BehaviorSubject<User | null> = null!;
  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private http: HttpClient,
    private notifyService: NotifyService,
    private router: Router
  ) {
    let userdata = sessionStorage.getItem("user-data") as string;
    if (userdata) {
      this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(userdata));
    }
    else
      this.currentUserSubject = new BehaviorSubject<User | null>(null);

  }
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(data: LoginModel) {
    this.http.post<any>(`https://localhost:7218/api/Account/Login`, data)
      .subscribe({
        next: r => {
          console.log('Login successful', r);
          let user = this.save(r);
          //console.log('User:', user);
          this.currentUserSubject.next(user);
          //console.log('Current User:', this.currentUserSubject.value);
          this.loginEvent.emit('login');
        },
        error: err => {
          console.error('Login failed!', err);

          if (err.status === 401) {
            // Unauthorized - Incorrect username or password
            this.setPasswordValidationError('Incorrect username or password. Please try again.');
            this.notifyService.message('Login failed! Incorrect username or password.', 'Close');
          } else if (err.status === 404) {
            // Not Found - User does not exist
            this.setPasswordValidationError('User not found. Please check your credentials.');
            this.notifyService.message('Login failed! User not exist.', 'Close');
          } else {
            // Other errors
            this.setPasswordValidationError('Incorrect password. Please try again later.');
            this.notifyService.message('Login failed! An unexpected error occurred.', 'Close');
          }
        }
      });
  }

  setPasswordValidationError(message: string): void {
    this.passwordValidationError = message;
  }

  clearPasswordValidationError(): void {
    this.passwordValidationError = '';
  }


  logout() {
    sessionStorage.removeItem("user-data");
    this.currentUserSubject.next(null);
    this.loginEvent.emit('logout');
    this.router.navigateByUrl('login');
  }

  save(data: any): User {
    const payload = JSON.parse(window.atob(data.token.split('.')[1]));
  
    const user: User = {
      username: payload.username,
      password: payload.password,
      fullName: data.fullName,
      aboutMe: data.aboutMe,
      gender: data.gender,
      birthDate: new Date(data.birthDate),
      picture: data.picture,
      address: data.address,
      email: data.email,
      phoneNumber: data.phoneNumber,
      roles: payload.roles.split(","),
      token: data.token,
    };
  
    sessionStorage.setItem("user-data", JSON.stringify(user));
    return user;
  }  
  getEmitter() {
    return this.loginEvent;
  }
}
