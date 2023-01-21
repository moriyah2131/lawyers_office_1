import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from '../models/new-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  userID: number = Number(this.userService.getUser()?.personId);
  private base = 'https://localhost:44315/api/Files';


  constructor(private http: HttpClient, private userService: UserService) {}

  getById(): Observable<NewUser> {
    let personID = this.userService.getUser()?.personId;
    return this.http.get<NewUser>(`${this.base}/getById/${personID}`);
  }


}
