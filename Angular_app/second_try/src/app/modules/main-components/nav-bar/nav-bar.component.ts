import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  messagesCount: number = 11;
  openDropdown: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

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
