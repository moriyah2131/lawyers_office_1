import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as saveAs from 'file-saver';
import { MyFile } from 'src/app/models/File';
import { FileService } from 'src/app/services/file.service';
import { DiaolgComponent } from 'src/app/modules/main-components/diaolg/diaolg.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-files-dialog',
  templateUrl: './files-dialog.component.html',
  styleUrls: ['./files-dialog.component.scss'],
})
export class FilesDialogComponent implements OnInit {
  loading: boolean = false;
  file: File | null = null;
  files: MyFile[] = [];
  panelOpenState = false;

  constructor(
    private fileService: FileService,
    public dialogRef: MatDialogRef<FilesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bagId: number },
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles() {
    let userType = this.userService.getUser()?.userType;
    if (userType == 'CUSTOMER')
      this.fileService.getFilesByBagId(this.data.bagId).subscribe(
        (res: MyFile[]) => {
          this.files = res;
        },
        (err: any) => {
          console.error(err);
        }
      );
    else if (userType == 'LAWYER') debugger;
    this.fileService.getAllFilesByBagId(this.data.bagId).subscribe(
      (res: MyFile[]) => {
        this.files = res;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    this.loading = !this.loading;
    let doc: any;

    if (this.data.bagId && this.file)
      this.file
        // .arrayBuffer()
        // .then((res) => {
        //   doc = new Uint8Array(res)
        // })
        .text()
        .then((res) => {
          doc = btoa(unescape(encodeURIComponent(res))); //עובד רק לקבצים פשוטים
        })
        .then(() => {
          if (this.file)
            this.fileService
              .uploadFile(this.data.bagId, this.file.name, doc)
              .subscribe(
                () => {
                  this.loading = false;
                  this.loadFiles();
                },
                (err) => {
                  this.loading = false;
                  console.error(err);
                }
              );
        });
  }

  isNew(openDate?: Date): boolean {
    if (openDate == null || undefined) return false;
    let fileDate = new Date(openDate);
    return new Date().getDate() - fileDate.getDate() <= 7;
  }

  download(file: MyFile) {
    //const content = this.dataURItoBlob(file.document);
    //console.log(typeof file.document);
    /// const blob = new Blob([content]);
    const byteArray = new Uint8Array(
      atob(file.document.toString())
        .split('')
        .map((char) => char.charCodeAt(0))
    );
    saveAs(new Blob([byteArray]), file.fileName);
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array]);
    return blob;
  }

  removeFile(file: MyFile) {
    this.loading = true;
    let result: string = 'true';
    let dialogRef = this.dialog.open(DiaolgComponent, {
      height: '200',
      width: '200',
      data: {
        title: 'מחיקה',
        question: 'האם אתה בטוח?',
        needInput: false,
        result: result,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      result = res;
      if (res == 'true')
        this.fileService.remove(file.id).subscribe(
          () => {
            this.loading = false;
            this.loadFiles();
          },
          () => (this.loading = false)
        );
      else this.loading = false;
    });
  }

  editFileName(file: MyFile) {
    let result: string = '';
    const suffixIndex = file.fileName.lastIndexOf('.');
    let suffix = '',
      index = suffixIndex;
    while (index < file.fileName.length) {
      suffix += file.fileName.charAt(index++);
    }
    console.log(suffix);

    let dialogRef = this.dialog.open(DiaolgComponent, {
      height: '280px',
      width: '280px',
      data: {
        title: 'עריכה',
        question: 'שנה את שם הקובץ',
        needInput: true,
        result: result,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      result = res;
      this.loading = true;
      if (res && res != 'false') {
        file.fileName = result + suffix;
        debugger;
        this.fileService.edit(file).subscribe(
          () => {
            this.loading = false;
            this.loadFiles();
          },
          () => (this.loading = false)
        );
      } else this.loading = false;
    });
  }

  setPermissions(file: MyFile) {
    let result: string = '';

    let dialogRef = this.dialog.open(DiaolgComponent, {
      height: '580px',
      width: '580px',
      data: {
        title: 'הרשאות',
        question: 'בחר מי יוכל לצפות ולערוך אתה הקובץ',
        needInput: false,
        permission: file.access,
        result: result,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      result = res;
      this.loading = true;
      if (res && res != 'false') {
        console.log(res);
        this.fileService.setPermissions(file.id, Number(result)).subscribe(
          () => {
            this.loading = false;
            this.loadFiles();
          },
          () => (this.loading = false)
        );
      } else this.loading = false;
    });
  }
}
