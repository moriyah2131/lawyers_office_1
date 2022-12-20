import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  selectedTasks: Task[] = [];
  allChecked: boolean = false;
  bagId: number = Number(this.route.snapshot.paramMap.get('id'));
  tasks: Task[] = [];
  @Input() forName?: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.selectedTasks = [];
    this.allChecked = false;
    if (this.bagId)
      this.taskService
        .getTasks(this.bagId)
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
}
