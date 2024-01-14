import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  
  constructor(
    public authService: AuthService,
    private router: Router
    ) {}
  ngOnInit(): void {
    
  }
  
  get username (){
    return this.authService.userName;
  }
  get isLoggedIn()
  {
    return this.authService.isLoggedIn();
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

  isSidebarCollapsed = false;
  
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}

  
  
