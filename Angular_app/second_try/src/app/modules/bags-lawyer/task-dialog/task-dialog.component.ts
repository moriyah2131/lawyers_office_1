import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Link } from 'src/app/models/link';
import { NewUser } from 'src/app/models/new-user';
import { Task } from 'src/app/models/Task';
import { LinkService } from 'src/app/services/link.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { DiaolgComponent } from '../../main-components/diaolg/diaolg.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent implements OnInit {
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
    linkID: this.data.task?.linkID,
    linkName: this.data.task?.linkName,
    siteAddress: this.data.task?.siteAddress,
  };

  whomForIDs: number[] = [];
  loading: boolean = false;
  links: Link[] = [];
  showAddLink: boolean = false;
  validationsErr: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<DiaolgComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      task?: Task;
      participants?: NewUser[];
      result?: string;
      bagID: number;
    },
    private userService: UserService,
    private taskService: TaskService,
    private linkService: LinkService
  ) {}

  ngOnInit(): void {
    this.linkService.getAll().subscribe((res) => (this.links = res));
    let personID = this.userService.getUser()?.personId;
    if (personID) this.whomForIDs.push(personID);
  }

  onNoClick(): void {
    this.data.result = 'false';
    this.dialogRef.close('false');
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
    if (!personID) personID = this.userService.getUser()?.personId ?? -1;

    let index: number = this.whomForIDs.indexOf(personID);
    if (index == -1 && personID > 0) this.whomForIDs.push(personID);
    else this.whomForIDs.splice(index, 1);
  }

  submit() {
    if (
      !this.curTask.actionPatternName ||
      this.curTask.actionPatternName.length < 2
    ) {
      this.validationsErr = true;
      return;
    }

    this.loading = true;
    if (this.data.task)
      this.taskService.putTask(this.curTask).subscribe(
        () => {
          this.loading = false;
          this.dialogRef.close();
        },
        (err) => {
          this.loading = false;
          console.error(err);
          alert('שגיאה. נסה שוב מאוחר יותר');
        }
      );
    else
      this.taskService
        .postTask(this.curTask, this.whomForIDs, this.data.bagID)
        .subscribe(
          () => {
            this.loading = false;
            this.dialogRef.close();
          },
          (err) => {
            this.loading = false;
            console.error(err);
            alert('שגיאה. נסה שוב מאוחר יותר');
          }
        );
  }

  clickOtherLink() {
    this.showAddLink = true;
    this.curTask.linkID = -1;
    this.curTask.linkName = '';
    this.curTask.siteAddress = '';
  }
}
