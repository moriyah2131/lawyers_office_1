import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from '../models/link';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private base = 'https://localhost:44315/api/Links';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Link[]> {
    return this.http.get<Link[]>(`${this.base}/getAll`);
  }
}
