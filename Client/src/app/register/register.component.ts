import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user/user.service';
import { AuthentificationService } from '../service/auth/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User('', '');

  constructor(
    private userService: UserService,
    private authService: AuthentificationService
  ) { }

  ngOnInit() {
  }

  register(): void {
    this.userService.addUser(this.user)
      .subscribe(user => {
        console.log(user);
        this.login();
      }
      )
  }

  login(): void {
    this.authService.login(this.user.username, this.user.password)
      .subscribe(
        token => {
          console.log(JSON.stringify(this.user.username));
          console.log(JSON.stringify(token));
          localStorage.setItem('currentUser', JSON.stringify(this.user.username))
          localStorage.setItem('currentToken', JSON.stringify(token));
        },
        err => console.error(err)
      );
  }

}
