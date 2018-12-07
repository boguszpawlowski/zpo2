import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/list/books.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorsComponent } from './authors/list/authors.component';
import { BookService } from './service/book/book.service';
import { MatGridListModule, MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookFormComponent } from './books/form/book-form.component';
import { AuthorFormComponent } from './authors/form/author-form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { TokenInterceptor } from './service/interceptor/token-interceptor';
import { AuthentificationService } from './service/auth/authentification.service';
import { AuthGuard } from './service/auth/authguard';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorsComponent,
    DashboardComponent,
    BookFormComponent,
    AuthorFormComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    AppRoutingModule,
    MatGridListModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, 
  BookService,
  AuthentificationService,
  AuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
