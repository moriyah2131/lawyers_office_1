import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private base = 'https://localhost:44315/api/Actions';
  constructor(private http: HttpClient, private userService: UserService) {}

  getTasks(bagID: number, userID?: number): Observable<Task[]> {
    if (!userID) userID = this.userService.getUser()?.personId;
    return this.http.get<Task[]>(`${this.base}/getListById/${bagID}/${userID}`);
  }

  updateList(bagID: number, completedTasks: Task[]): Observable<Task[]> {
    return this.http.put<Task[]>(
      `${this.base}/putList/${bagID}/buyer`,
      JSON.stringify(completedTasks),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  deleteTasksList(selectedTasksIDs: number[]): Observable<void> {
    return this.http.post<void>(
      `${this.base}/deleteList`,
      JSON.stringify(selectedTasksIDs),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
