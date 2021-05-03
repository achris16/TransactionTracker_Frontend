import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.getJWT() ? true : false;

    this.authService.loginSubject.subscribe((loginEvent: any) => {
      this.loggedIn = loginEvent;
    });
  }

  logout(): void {
    this.loggedIn = false;
    this.authService.setJWT('');
    this.router.navigate(['/login']);
  }

}
