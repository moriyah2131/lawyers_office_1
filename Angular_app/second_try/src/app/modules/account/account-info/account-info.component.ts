import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUser } from 'src/app/models/new-user';
import { AccountService } from 'src/app/services/Account.service';
import { PersonService } from 'src/app/services/person.service';
import { UserService } from 'src/app/services/user.service';
import { CreateBagFormComponent } from '../../bags-lawyer/create-bag-form/create-bag-form.component';
import { DiaolgComponent } from '../../main-components/diaolg/diaolg.component';

// 1. כשמוחקים אדם שזה ירענן את הדף ויצא מהאפשרות של למחוק
// 2. שאם זה אדם שהוסר כבר מהמערכת שלא יתן להסיר או שיכתוב שהוא כבר הוסר מהמערכת
// 3. באופן כללי איך אני מוחקת את כל הנתונים מהדטה בייס?
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

  @ViewChild('child')
  private child: CreateBagFormComponent | undefined;

  constructor(
    private personService: PersonService,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

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

    dialogRef.afterClosed().subscribe((res) => {
      result = res;
      if (res == 'true' && this.person?.email != null) {
        this.accountService.delete(this.person.email).subscribe(
          () => {
            alert('המשתמש נמחק בהצלחה');
          },
          (err) => {
            alert('שגיאה');
          }
        );
      } else this.loading = false;
    });
  }

  logOut() {
    window.location.reload();
  }

  getPerson(): NewUser | undefined {
    return this.person;
  }

  saveChanges() {
    this.child?.onSubmit();
  }

  Submit(personToPut: NewUser) {
    if (personToPut)
      this.personService.putPerson(personToPut).subscribe(
        (res) => {
          this.person = res;
          this.editMode = false;
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
