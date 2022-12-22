import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-logins-to-print',
  templateUrl: './logins-to-print.component.html',
  styleUrls: ['./logins-to-print.component.css'],
})
export class LoginsToPrintComponent implements OnInit {
  @Input() loginsRes: Login[] = [];
  @Input() bagName: string = 'זה';

  constructor(
    public dialogRef: MatDialogRef<LoginsToPrintComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { logins?: Login[]; bagName?: string },
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.data.logins) {
      this.loginsRes = this.data.logins;
    }
    if (this.data.bagName) {
      this.bagName = this.data.bagName;
    }
  }

  onPrint() {
    window.print();
  }
}
