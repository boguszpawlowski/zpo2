import { Component } from '@angular/core';
import { AuthentificationService } from './service/auth/authentification.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string = 'Library';
  username: string;
  loggingSubscription: Subscription;
  loggedIn = false;

  constructor(
    public authService: AuthentificationService
  ) {
    this.username = localStorage.getItem('currentUser');
    this.loggingSubscription = this.authService.loggedIn$
      .subscribe(
        (state: boolean) => {
          console.log(`subscribe: ${state}`);
          this.onStateChanged(state);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.authService.logout();
    this.loggingSubscription.unsubscribe();
  }

  onStateChanged(state: boolean): void {
    console.log(`user logged in`);
    this.loggedIn = state;
    if (state)
      this.username = localStorage.getItem('currentUser').trim();
  }

  logout() {
    this.authService.logout();
  }
}
