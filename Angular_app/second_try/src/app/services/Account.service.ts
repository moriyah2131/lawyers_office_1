import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../models/Register';
import { Login } from '../models/Login';
import { Account } from '../models/Account';
import { User } from '../models/User';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private base = 'https://localhost:44315/api/Accounts';

  constructor(private http: HttpClient) {}

  register(newUser: Register): Observable<boolean> {
    return this.http.post<boolean>(`${this.base}/register`, newUser);
  }

  postLawyer(newUser: NewUser): Observable<string> {
    return this.http.post<string>(`${this.base}/postLawyer`, JSON.stringify(newUser),
    {
      headers: { 'Content-Type': 'application/json' },
    } );
  }

  delete(userEmail: string): Observable<void> {
    debugger
    return this.http.delete<void>(`${this.base}/deleteUser?email=${userEmail}`);
  }

  login(login: Login): Observable<User> {
    return this.http.post<User>(`${this.base}/logIn`, login);
  }

  getAccountInfo(accountID: number): Observable<Account> {
    return this.http.get<Account>(`${this.base}/Account/${accountID}`);
  }

  getAllPerson(): Observable<NewUser[]> {
    return this.http.get<NewUser[]>(`${this.base}/getAllPerson`);

  }
  getAllLawyer(): Observable<NewUser[]> {
    return this.http.get<NewUser[]>(`${this.base}/getAllLawyer`);

  }
}
