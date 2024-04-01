import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CostumerDashboardComponent } from './costumer-dashboard/costumer-dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { BooksComponent } from './books/books.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminDashboardComponent,
    CostumerDashboardComponent,
    BooksComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
