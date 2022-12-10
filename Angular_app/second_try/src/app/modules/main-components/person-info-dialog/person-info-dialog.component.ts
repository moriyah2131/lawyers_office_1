import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewUser } from 'src/app/models/new-user';

@Component({
  selector: 'app-person-info-dialog',
  templateUrl: './person-info-dialog.component.html',
  styleUrls: ['./person-info-dialog.component.css'],
})
export class PersonInfoDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<PersonInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      person?: NewUser;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
