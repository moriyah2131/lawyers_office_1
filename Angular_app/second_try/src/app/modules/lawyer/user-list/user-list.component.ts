import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { NewUser } from 'src/app/models/new-user';
import { AccountService } from 'src/app/services/Account.service';
import { PersonInfoDialogComponent } from '../../main-components/person-info-dialog/person-info-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements   OnInit {
userData:NewUser[]=[];
loading: boolean = false;
error: string | undefined;
dataSource!: MatTableDataSource<NewUser>;
user:  string[] = ['name'];


  constructor(
    private accountService: AccountService,
    public dialog: MatDialog
  ) { }
   
  ngOnInit(): void {    
  this.loadData(); 
  }
  
  loadData(){
    this.accountService.getAllPerson().subscribe((res) => {
      this.userData =res;
          this.dataSource = new MatTableDataSource(this.userData);
    } ,(err) => {
      this.error = err.error;});
  }

  openPersonInfoDialog(person?: NewUser): void {
    if (person){
    let dialogRef=  this.dialog.open(PersonInfoDialogComponent, {
        data: {
          person: person,
        },
        
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadData();
      })
  }
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}