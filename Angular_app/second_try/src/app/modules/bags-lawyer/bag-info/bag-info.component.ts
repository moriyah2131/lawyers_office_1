import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FilesDialogComponent } from '../../bags/files-dialog/files-dialog.component';
import { Bag } from 'src/app/models/Bag';
import { BagsService } from 'src/app/services/bags.service';
import { NewUser } from 'src/app/models/new-user';
import { TasksListComponent } from '../../shared/tasks-list/tasks-list.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-bag-info',
  templateUrl: './bag-info.component.html',
  styleUrls: ['./bag-info.component.scss'],
})
export class BagInfoComponent implements OnInit {
  bagId: number = Number(this.route.snapshot.paramMap.get('id'));
  bag?: Bag;
  loading: boolean = false;
  currentPerson?: NewUser;
  participants: NewUser[] = [];
  @ViewChild(TasksListComponent) tasksList?: TasksListComponent;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private bagsService: BagsService
  ) {}

  ngOnInit(): void {
    this.bagsService.getBagInfoById(this.bagId).subscribe(
      (res: Bag) => {
        this.bag = res;
        this.loading = false;
        if (this.bag?.agent) this.participants.push(this.bag?.agent);
        this.bag?.buyers?.forEach((buyer) => {
          if (buyer) this.participants.push(buyer);
        });
        this.bag?.sellers?.forEach((seller) => {
          if (seller) this.participants.push(seller);
        });
        if (this.currentPerson) this.participants.push(this.currentPerson);
      },
      (err: any) => {
        console.error(err.error);
        this.loading = false;
      }
    );
  }

  openFilesDialog(): void {
    const dialogRef = this.dialog.open(FilesDialogComponent, {
      width: '850px',
      data: { bagId: this.bagId },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
