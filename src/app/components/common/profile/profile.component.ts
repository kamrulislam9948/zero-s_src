import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/authentication/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: User | null = null;
  
  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  email =JSON.parse(sessionStorage.getItem("loggedInUser")!).email;
  userProfile = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;

  constructor(
    public authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  saveButtonVisible: boolean = false;

  toggleButtons() {
    this.saveButtonVisible = !this.saveButtonVisible;
  }

  saveProfile() {
    
  }
  signOut(){
    sessionStorage.removeItem("loggedInUser")
    this.authService.signOut();

  }
}
