import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emptyValues = false;
  invalidCredentials = false; 

  constructor(private router: Router, private authService: AuthService, private toasterService: ToastrService) { }

  login() {
    if (this.email.trim().length !== 0 && this.password.trim().length !== 0) {

      this.authService.login(this.email, this.password).subscribe(
        (data) => {
          if (data) {
            localStorage.setItem('token', JSON.stringify(data));

            this.authService.getRoles().subscribe((role) => {
              if (role.includes('Admin')) {
                
                this.router.navigateByUrl('/admin-dashboard');
                this.toasterService.success('Welcome Admin', '', {
                  toastClass: 'custom-toast',
                  positionClass: 'toast-top-right'
                });
              } else {
                
                this.router.navigateByUrl('/costumer-dashboard');
              }
            });
          } else {
            console.error('Invalid token received from the server.');
            this.invalidCredentials = true; 
          }
        },
        (err) => {
          console.error('Login failed:', err);
          this.invalidCredentials = true; 
        }
      );
    } else {
      this.emptyValues = true;
    }
  }
}
