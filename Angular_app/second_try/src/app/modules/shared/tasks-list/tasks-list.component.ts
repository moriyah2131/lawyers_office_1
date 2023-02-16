import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { TaskDialogComponent } from '../../bags-lawyer/task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  selectedTasks: Task[] = [];
  allChecked: boolean = false;
  tasks: Task[] = [];

  @Input() bagId?: number = Number(this.route.snapshot.paramMap.get('id'));
  @Input() participants?: NewUser[];
  @Input() person?: NewUser;
  @Input() allowSensitiveActions?: boolean;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  onPersonChange(curPerson?: NewUser, bagId?: number) {
    if (this.bagId == bagId) {
      console.log(this.bagId);
      this.person = curPerson;
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.selectedTasks = [];
    this.allChecked = false;
    if (this.bagId == -1)
      this.taskService
        .getLawyerTasks(this.person?.id)
        .subscribe((res: Task[]) => (this.tasks = res));
    else if (this.bagId)
      this.taskService
        .getTasks(this.bagId, this.person?.id)
        .subscribe((res: Task[]) => (this.tasks = res));
  }

  onsSlectedChange(task: Task): void {
    let index: number = this.selectedTasks.indexOf(task);
    if (index == -1 && task.actionState) this.selectedTasks.push(task);
    else this.selectedTasks.splice(index, 1);
  }

  setAsCompleted(): void {
    let completedTasks: Task[] = [];
    if (this.selectedTasks.length > 0 && this.bagId) {
      this.selectedTasks.forEach((element) => {
        if (element.actionState == 'waiting') {
          element.actionState = 'done';
          completedTasks.push(element);
        }
      });
      this.taskService.updateList(this.bagId, completedTasks).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  setAsNotCompleted(): void {
    let uncompletedTasks: Task[] = [];
    if (this.selectedTasks.length > 0 && this.bagId) {
      this.selectedTasks.forEach((element) => {
        if (element.actionState == 'done') {
          element.actionState = 'waiting';
          uncompletedTasks.push(element);
        }
      });
      this.taskService
        .updateList(this.bagId, uncompletedTasks)
        .subscribe(() => {
          this.loadTasks();
        });
    }
  }

  deleteTasksList(): void {
    let selectedTasksIDS: number[] = [];
    this.selectedTasks.forEach((element) => {
      selectedTasksIDS.push(element.id);
    });
    this.taskService.deleteTasksList(selectedTasksIDS).subscribe(
      () => {
        this.loadTasks();
      },
      () => {
        this.loadTasks();
      }
    );
  }

  openTaskDialog(create: boolean): void {
    let task;
    if (!create) {
      if (this.selectedTasks.length > 1) {
        alert('יש לבחור משימה אחת בלבד.');
        return;
      }
      if (this.selectedTasks.length == 0) {
        alert('יש לבחור משימה');
        return;
      }
      task = this.selectedTasks[0];
    }
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task: task,
        participants: this.participants,
        bagID: this.bagId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) this.loadTasks();
    });
  }

  getBagName(task: Task): string {
    return task.bag ? ' [ ' + task.bag.bagName + ' ] ' : '';
  }

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
