import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  getRoles(): Observable<string[]> {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: any = jwtDecode(token);

      const roles = decodedToken.role || [];
      return of(roles);
    }

    return of([]);
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/users/login', {
      email,
      password,
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post('http://localhost:3000/api/users/create', { name, email, password })
  }




  isLoggedIn(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return of(token !== undefined && token !== null);
    }
    return of(false); // Return false for server-side rendering
  }
}
