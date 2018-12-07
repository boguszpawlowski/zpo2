import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, switchMap, finalize, filter, take } from "rxjs/operators"
import { Router } from "@angular/router";
import { AuthentificationService } from "../auth/authentification.service";
import { Token } from "../../model/token";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);


  constructor(
    private router: Router,
    private authService: AuthentificationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    /*
    if (!request.headers.get('login')) {
      if (localStorage.getItem('currentToken')) {
        let newRequest = this.authorize(request);
        return next.handle(newRequest)
          .pipe(
            catchError(error => {
              if (error instanceof HttpErrorResponse) {
                console.log('error' + error.status)
                switch (error.status) {
                  case 401:
                    this.handle401Error(request, next);
                  case 400:
                    this.handle400Error(error);
                }
              }
              else {
                return Observable.throw(error);
              }
            })
          )
      } else {
        // todo redirect
        console.log("token is empty")
        return this.logoutUser();
      }
    }
    */
    return next.handle(request);
  

  }

  authorize(request: HttpRequest<any>): HttpRequest<any> {
    return request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentToken'))["access_token"]}`
      }
    });
  }

  handle400Error(error) {
    this.logoutUser();
    return Observable.throw(error);
  }

  handle401Error(request, next) {
    localStorage.removeItem('currentToken');
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.authService.refresh(JSON.parse(localStorage.getItem('currentToken'))["refresh_token"])
        .pipe(
          switchMap((token: Token) => {
            this.tokenSubject.next(JSON.stringify(token));
            localStorage.setItem('currentToken', JSON.stringify(token))
            return next.handle(this.authorize(request))
          }),
          catchError((error) => {
            return this.logoutUser();
          }),
          finalize(() => {
            this.isRefreshingToken = false
          })
        )
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.authorize(request))
        })
      )
    }
  }

  logoutUser() {
    this.authService.logout();
    console.log("logging user out");
    this.router.navigate(['/login'])
    return Observable.throw("");
  }
}