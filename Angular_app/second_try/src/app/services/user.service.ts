import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private personID?: number;
  private user?: User;
  private authoBehavior = new BehaviorSubject<boolean>(false);
  private auth = this.authoBehavior.asObservable();

  getAuth(): Observable<boolean> {
    if (this.personID) this.setAuth(true);
    else this.setAuth(false);
    return this.auth;
  }

  setAuth(bool: boolean) {
    this.authoBehavior.next(bool);
  }

  getUser(): User | undefined {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  setPersonID(id: number) {
    this.setAuth(true);
    this.personID = id;
  }

  getPersonID(): number | undefined {
    return this.personID;
  }

  logOut() {
    this.personID = undefined;
    this.setAuth(false);
  }
}
