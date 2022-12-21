import { Component, Input, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-logins-to-print',
  templateUrl: './logins-to-print.component.html',
  styleUrls: ['./logins-to-print.component.css'],
})
export class LoginsToPrintComponent implements OnInit {
  @Input() loginsRes: Login[] = [];
  @Input() bagName: string = 'זה';

  constructor() {}

  ngOnInit(): void {}

  onPrint() {
    window.print();
  }
}
