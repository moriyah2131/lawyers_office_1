import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/Account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | undefined;
  loading: boolean = false;

  @Output() goToRegisterEvent = new EventEmitter<boolean>();

  constructor(
    private accountServise: AccountService,
    private userService: UserService,
    private router: Router
  ) {}

  Signin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'נא למלא את השדות';
      return;
    }

    const login: Login = {
      email: this.email,
      password: this.password,
    };

    this.loading = true;

    this.accountServise.login(login).subscribe(
      (res: User) => {
        this.userService.setUser(res);
        this.loading = false;
        this.router.navigate(['/']);
        if (res.isFirstVisit) this.goToRegister();
        else this.userService.setPersonID(res.personId);
      },
      (err) => {
        this.loading = false;
        this.errorMessage = err.error;
      }
    );
  }

  goToRegister() {
    this.goToRegisterEvent.emit(true);
  }
}
