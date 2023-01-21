import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-diaolg',
  templateUrl: './diaolg.component.html',
  styleUrls: ['./diaolg.component.css'],
})
export class DiaolgComponent {
  permissions: { name: string; id: number }[] = [
    { name: '(רק אתה (משרד הבלין-ולר', id: 0 },
    { name: 'רק מי שהעלה את המסמך (דיפולטיבי)', id: 1 },
    { name: 'רק הקונים', id: 2 },
    { name: 'רק המוכרים', id: 3 },
    { name: 'כל עו"ד וב"כ המשתתפים בתיק', id: 4 },
    { name: 'כל המשתתפים בתיק', id: 5 },
  ];
  currentPermissionID: number | undefined = this.data.permission;

  constructor(
    private dialogRef: MatDialogRef<DiaolgComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      question: string;
      needInput: boolean;
      permission: number | undefined;
      result: string;
    },
    private userService: UserService
  ) {}

  onNoClick(): void {
    this.data.result = 'false';
    this.dialogRef.close();
  }

  isPermitted(): boolean {
    let userType = this.userService.getUser()?.userType;
    switch (userType?.toUpperCase()) {
      case 'LAWYER':
        return true;
      case 'CUSTOMER':
        return false;
      case 'SELLER':
        return false;
    }
    return false;
  }
}
