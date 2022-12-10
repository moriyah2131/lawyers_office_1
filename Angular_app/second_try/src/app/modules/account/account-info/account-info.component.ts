import { Component, Input } from '@angular/core';
import { NewUser } from 'src/app/models/new-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent {
  @Input() person?: NewUser;

  constructor(private userService: UserService) {}

  logout() {
    this.userService.logOut();
  }
}
