import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthentificationService } from "./authentification.service";
import { Observable, of } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        public authService: AuthentificationService,
        private router: Router
    ){ }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>{
        return of(true)
        /*
        return this.authService.loggedIn$
            .pipe(
                take(1),
                map((loggedIn)=>{
                    if(!loggedIn){
                        this.router.navigate(['/login'])
                        return false
                    }
                    return true;
                })
            )
            */
    }
}