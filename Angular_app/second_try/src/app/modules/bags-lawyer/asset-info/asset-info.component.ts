import { Component, Input } from '@angular/core';
import { Asset } from 'src/app/models/asset';

@Component({
  selector: 'app-asset-info',
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss'],
})
export class AssetInfoComponent {
  @Input() asset?: Asset;
}
