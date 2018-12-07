import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../../model/token';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const HttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};

const url = "http://localhost:8080/login";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private loggedIn;
  public loggedIn$;
  constructor(
    private http: HttpClient,
    private router: Router

  ) {
    //TODO remove //TODO auth guard
    // localStorage.removeItem('currentToken');
    // localStorage.removeItem('currentUser');
    if (localStorage.getItem('currentToken')) {
      this.loggedIn = new BehaviorSubject<boolean>(true);
    } else {
      this.loggedIn = new BehaviorSubject<boolean>(false);
    }
    this.loggedIn$ = this.loggedIn.asObservable();
    this.loggedIn$
      .subscribe(
        (state: boolean) => console.log(`working: ${state}`)
      );
  }

  login(username: string, password: string) {
    let data = `username=${username}&password=${password}`;
    return this.http.post<Token>(url, data, HttpOptions)
      .pipe(
        tap(() => {
          console.log('state changed');
        })
      )
  }
  refresh(refreshToken: string) {
    let data = `grant_type=refresh_token&refresh_token=${refreshToken}`;
    return this.http.post<Token>(url, data, HttpOptions)
  }

  logout() {
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login'])
  }

  userLoggedIn() {
    this.loggedIn.next(true);
  }
}
