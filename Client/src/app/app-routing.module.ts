import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/list/books.component';
import { AuthorsComponent } from './authors/list/authors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './service/auth/authguard';

const routes: Routes = [
  { path: 'books', component: BooksComponent, canActivate :[AuthGuard] },
  { path: 'authors', component: AuthorsComponent, canActivate :[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate :[AuthGuard] },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
