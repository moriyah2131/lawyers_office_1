import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
