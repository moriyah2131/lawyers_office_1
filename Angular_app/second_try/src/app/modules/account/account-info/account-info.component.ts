import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { AccountService } from 'src/app/services/Account.service';
import { PersonService } from 'src/app/services/person.service';
import { UserService } from 'src/app/services/user.service';
import { CreateBagFormComponent } from '../../bags-lawyer/create-bag-form/create-bag-form.component';
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
  @Input() private?: boolean;
  loading: boolean = false;
  editMode: boolean = false;
   type?:string;

  @ViewChild('child')
  private child: CreateBagFormComponent | undefined;

  constructor(
    private personService: PersonService,
    private accountService: AccountService,
    public dialog: MatDialog
  ,
     private router: Router) {}

  ngOnInit() {
    if (!this.person && this.private) {
      this.personService.getById().subscribe(
        (res) => {
          this.person = res;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

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
this.type=this.person?.userType
   
    dialogRef.afterClosed().subscribe((res) => {
      result = res;
      if (res == 'true'&&this.person?.email!=null)
{
    this.accountService.delete(this.person.email).subscribe(
      ()=>{  if(this.type=="lawyer")  
              // {this.router.navigateByUrl("/lawyer-account/lawyerlist");}
              // else{
              //   this.router.navigateByUrl("/lawyer-account/userlist");

              // }

        alert("המשתמש נמחק בהצלחה");
               
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
