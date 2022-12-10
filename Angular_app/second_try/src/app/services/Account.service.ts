import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../models/Register';
import { Login } from '../models/Login';
import { Account } from '../models/Account';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private base = 'https://localhost:44315/api/Accounts';

  constructor(private http: HttpClient) {}

  register(newUser: Register): Observable<boolean> {
    return this.http.post<boolean>(`${this.base}/register`, newUser);
  }

  login(login: Login): Observable<User> {
    return this.http.post<User>(`${this.base}/logIn`, login);
  }

  getAccountInfo(accountID: number): Observable<Account> {
    return this.http.get<Account>(`${this.base}/Account/${accountID}`);
  }
}
