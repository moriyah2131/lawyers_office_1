import { Component, Input, OnInit } from '@angular/core';
import { BagsService } from 'src/app/services/bags.service';

@Component({
  selector: 'app-bag-name',
  templateUrl: './bag-name.component.html',
  styleUrls: ['./bag-name.component.scss'],
})
export class BagNameComponent implements OnInit {
  constructor(private bagsService: BagsService) {}

  @Input() bagName: string = '';
  @Input() bagID: number = -1;

  ngOnInit(): void {
    if (this.bagName == '' && this.bagID > 0) {
      this.bagsService
        .getBagInfoById(this.bagID)
        .subscribe((res) => (this.bagName = res.bagName));
    }
  }
}
