import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }
}
