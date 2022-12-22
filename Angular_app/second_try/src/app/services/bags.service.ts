import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bag } from '../models/Bag';
import { CreateBag } from '../models/CreateBag';
import { Login } from '../models/Login';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root',
})
export class BagsService {
  private base = 'https://localhost:44315/api/Bags';
  constructor(private http: HttpClient) {}

  getBagInfoById(bagID: number): Observable<Bag> {
    return this.http.get<Bag>(`${this.base}/getById/${bagID}`);
  }

  getBagsByIDs(bagsIDs: number[]): Observable<Bag[]> {
    return this.http.post<Bag[]>(`${this.base}/getListByIDs/`, bagsIDs);
  }

  getAllBags(currentPage: number, pageSize: number): Observable<Bag[]> {
    return this.http.get<Bag[]>(
      `${this.base}/getAll/${currentPage}/${pageSize}`
    );
  }

  getLoginsByID(bagId: number, participants: NewUser[]): Observable<Login[]> {
    return this.http.post<Login[]>(
      `${this.base}/getLoginsByID/${bagId}`,
      JSON.stringify(participants),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  post(newBag: CreateBag, bagName: string): Observable<Login[]> {
    return this.http.post<Login[]>(
      `${this.base}/post/${bagName}`,
      JSON.stringify(newBag),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  delete(bagID: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/delete/${bagID}`);
  }

  put(bagId: number, putBag: CreateBag, bagName: string): Observable<Login[]> {
    return this.http.put<Login[]>(
      `${this.base}/put/${bagId}/${bagName}`,
      JSON.stringify(putBag),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  putBagState(bagId: number, res: any): Observable<void> {
    return this.http.put<void>(
      `${this.base}/putBagState/${bagId}/${res}`,
      JSON.stringify({}),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
