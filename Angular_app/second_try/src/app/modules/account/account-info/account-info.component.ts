import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { AccountService } from 'src/app/services/Account.service';
import { UserService } from 'src/app/services/user.service';
import { DiaolgComponent } from '../../main-components/diaolg/diaolg.component';

// 2. שאם זה אדם שהוסר כבר מהמערכת שלא יתן להסיר או שיכתוב שהוא כבר הוסר מהמערכת
// 4. אם התיק מוגדר בסטטוס סגור שיעדכן את התאריך סגירה שלו בטבלה




@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent {
  @Input() person?: NewUser;
  loading: boolean = false;
  @Output() onDeleteSuccess = new EventEmitter<boolean>();

  constructor(private userService: UserService ,private accountService:AccountService,
     public dialog: MatDialog,
     private router: Router) {}
  
     ngOnInit(){}

  deleteUser() {
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
      if (res == 'true'&&this.person?.email!=null)
{
    this.accountService.delete(this.person.email).subscribe(
      ()=>{  
        alert("המשתמש נמחק בהצלחה");
            this.onDeleteSuccess.emit(true);
        },
        (err) => {
            alert("שגיאה")
            
          }
          );
  }
else this.loading = false;
});
}}