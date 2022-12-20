import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bag } from 'src/app/models/Bag';
import { BagsService } from 'src/app/services/bags.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-bags',
  templateUrl: './view-bags.component.html',
  styleUrls: ['./view-bags.component.css'],
})
export class ViewBagsComponent implements OnInit {
  bags: Bag[] = [];
  loading: boolean = false;

  constructor(
    private bagsService: BagsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    let IDs = this.userService.getUser()?.bagsIDs;
    if (IDs && IDs.length > 0)
      this.bagsService.getBagsByIDs(IDs).subscribe(
        (res: Bag[]) => {
          this.bags = res;
          this.loading = false;
        },
        (err: any) => {
          console.error(err.error);
          this.loading = false;
        }
      );
    else this.loading = false;
  }

  isNew(openDate?: Date): boolean {
    if (openDate == null || undefined) return false;
    let bagDate = new Date(openDate);
    return new Date().getDate() - bagDate.getDate() <= 7;
  }
}
