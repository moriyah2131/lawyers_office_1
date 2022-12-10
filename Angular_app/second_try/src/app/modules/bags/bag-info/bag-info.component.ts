import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { MatDialog } from '@angular/material/dialog';
import { FilesDialogComponent } from '../files-dialog/files-dialog.component';

@Component({
  selector: 'app-bag-info',
  templateUrl: './bag-info.component.html',
  styleUrls: ['./bag-info.component.scss'],
})
export class BagInfoComponent {
  selectedTasks: Task[] = [];
  allChecked: boolean = false;
  bagId: number = Number(this.route.snapshot.paramMap.get('id'));

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  openFilesDialog(): void {
    const dialogRef = this.dialog.open(FilesDialogComponent, {
      width: '850px',
      data: { bagId: this.bagId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
