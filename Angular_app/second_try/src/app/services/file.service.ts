import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyFile } from '../models/File';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  userID: number = Number(this.userService.getUser()?.personId);
  private base = 'https://localhost:44315/api/Files';
  constructor(private http: HttpClient, private userService: UserService) {}

  getFilesByBagId(bagID: number): Observable<MyFile[]> {
    return this.http.get<MyFile[]>(
      `${this.base}/getByBagId/${bagID}?personID=${this.userID}`
    );
  }

  getAllFilesByBagId(bagID: number): Observable<MyFile[]> {
    return this.http.get<MyFile[]>(`${this.base}/getAllByBagId/${bagID}`);
  }

  uploadFile(
    bagID: number,
    fileName: string,
    encodedContent: any
  ): Observable<void> {
    let newFile: MyFile;
    newFile = {
      id: 0,
      fileName: fileName,
      bagId: bagID,
      creatorId: this.userID,
      document: encodedContent,
      filePatternId: 4,
      uploadingDate: new Date(),
      access: 1,
    };
    return this.http.post<void>(`${this.base}/post`, JSON.stringify(newFile), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  remove(fileID: number): Observable<MyFile[]> {
    return this.http.delete<MyFile[]>(
      `${this.base}/delete?fileID=${fileID}&personID=${this.userID}`
    );
  }

  edit(file: MyFile): Observable<MyFile> {
    return this.http.put<MyFile>(`${this.base}/put`, JSON.stringify(file), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  setPermissions(fileID: number, permission: number): Observable<void> {
    return this.http.get<void>(
      `${this.base}/setPermissions/${fileID}/${permission}`
    );
  }
}
