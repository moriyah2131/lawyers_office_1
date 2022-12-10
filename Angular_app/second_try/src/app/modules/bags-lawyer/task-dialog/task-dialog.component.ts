import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewUser } from 'src/app/models/new-user';
import { Task } from 'src/app/models/Task';
import { DiaolgComponent } from '../../main-components/diaolg/diaolg.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  curTask: Task = {
    actionPatternName: this.data.task?.actionPatternName ?? '',
    actionPriority: this.data.task?.actionPriority ?? 0,
    actionState: this.data.task?.actionState ?? 'waiting',
    createdDate: this.data.task?.createdDate ?? new Date(),
    id: this.data.task?.id ?? 0,
    actionFileId: this.data.task?.actionFileId,
    actionPatternId: this.data.task?.actionPatternId,
    comments: this.data.task?.comments,
    deadLine: this.data.task?.deadLine,
    discription: this.data.task?.discription,
    linkName: this.data.task?.linkName,
    siteAddress: this.data.task?.siteAddress,
  };
  whomForID?: number;

  constructor(
    private dialogRef: MatDialogRef<DiaolgComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      task?: Task;
      participants?: NewUser[];
      result?: string;
    }
  ) {}

  onNoClick(): void {
    this.data.result = 'false';
    console.log(this.data.participants);
    this.dialogRef.close();
  }

  getType(userType: string): string {
    switch (userType.toUpperCase()) {
      case 'LAWYER':
        return 'בא כוח צד שני';
      case 'BUYER':
        return 'קונה';
      case 'SELLER':
        return 'מוכר';
    }
    return '';
  }

  setWhomFor(personID?: number) {
    this.whomForID = personID;
  }
}
