import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css'],
})
export class StatusDialogComponent implements OnInit {
  bagState: number = 0;

  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { status: number },
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bagState = this.data.status;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.bagState);
  }
}
