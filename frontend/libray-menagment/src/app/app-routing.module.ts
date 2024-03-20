import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CostumerDashboardComponent } from './costumer-dashboard/costumer-dashboard.component';
import { BooksComponent } from './books/books.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },

  {
    path: "home",
    component: HomeComponent,
  },

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },

  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
  },
  {
    path: "costumer-dashboard",
    component: CostumerDashboardComponent,
  },
  {
    path: "books",
    component: BooksComponent,
  },
  {
    path: "add-product",
    component: AddProductComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
