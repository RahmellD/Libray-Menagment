import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  emptyValues: boolean = false;
  invalidCredentials: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toasterService: ToastrService) { }

  register() {
    if (this.name.trim().length !== 0 && this.email.trim().length !== 0 && this.password.trim().length !== 0) {
      

      this.authService.register(this.name, this.email, this.password).subscribe(
        () => {
          this.router.navigateByUrl('/costumer-dashboard');
          this.toasterService.success('Successfully registered')
        },
        (err) => {
          console.error('Registration failed:', err);
          this.toasterService.error('Registration failed. Please try again.', '', {
            positionClass: 'toast-top-right'
          });
        }
      );
    } else {
      this.emptyValues = true;
    }
  }

}
