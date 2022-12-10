import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-diaolg',
  templateUrl: './diaolg.component.html',
  styleUrls: ['./diaolg.component.css'],
})
export class DiaolgComponent {
  constructor(
    private dialogRef: MatDialogRef<DiaolgComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      question: string;
      needInput: boolean;
      result: string;
    }
  ) {}

  onNoClick(): void {
    this.data.result = 'false';
    this.dialogRef.close();
  }
}
