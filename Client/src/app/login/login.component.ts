import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../model/user';
import { AuthentificationService } from '../service/auth/authentification.service';
import { Token } from '../model/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User('', '');
  loading: boolean = false;

  constructor(
    public authentificationService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.loading = true;
    this.authentificationService.login(this.user.username, this.user.password)
      .subscribe((token: Token) => {
        console.log(JSON.stringify(token));
        localStorage.setItem('currentUser', JSON.stringify(this.user.username))
        localStorage.setItem('currentToken', JSON.stringify(token));
        this.loading = false;
        this.router.navigate(['/dashboard']);
        this.authentificationService.userLoggedIn();
      },
        err => {
          console.error(err);
          this.loading = false;
        });
  }
}
