import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Asset } from 'src/app/models/asset';

@Component({
  selector: 'app-asset-info-dialog',
  templateUrl: './asset-info-dialog.component.html',
  styleUrls: ['./asset-info-dialog.component.css'],
})
export class AssetInfoDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AssetInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      asset?: Asset;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
