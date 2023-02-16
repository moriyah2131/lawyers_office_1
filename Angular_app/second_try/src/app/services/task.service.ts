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

  getLawyerTasks(personId?: number, userType?: string): Observable<Task[]> {
    if (!personId) personId = this.userService.getUser()?.personId;
    if (!userType) userType = this.userService.getUser()?.userType;
    return this.http.get<Task[]>(
      `${this.base}/getListByPersonId/${personId}/${userType}`
    );
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

  postTask(
    task: Task,
    whomForIDs: number[],
    bagID: number
  ): Observable<number[]> {
    return this.http.post<number[]>(
      `${this.base}/post/${bagID}`,
      JSON.stringify({ action: task, whomForIDs: whomForIDs }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  putTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.base}/put/`, JSON.stringify(task), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
