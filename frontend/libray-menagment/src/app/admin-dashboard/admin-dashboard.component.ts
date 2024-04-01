import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router) {}
  ngOnInit() {
   
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }

 
}
