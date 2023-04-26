import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-footer',
  templateUrl: './my-footer.component.html',
  styleUrls: ['./my-footer.component.scss'],
})
export class MyFooterComponent {
  constructor(private userService: UserService) {}
  getUserType(): string {
    let userType = this.userService.getUser()?.userType;
    switch (userType?.toUpperCase()) {
      case 'LAWYER':
        return 'lawyer';
      case 'CUSTOMER':
        return 'customer';
    }
    return '';
  }
}
