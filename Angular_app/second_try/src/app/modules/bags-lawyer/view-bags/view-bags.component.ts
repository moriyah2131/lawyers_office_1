import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Asset } from 'src/app/models/asset';
import { Bag } from 'src/app/models/Bag';
import { NewUser } from 'src/app/models/new-user';
import { BagsService } from 'src/app/services/bags.service';
import { UserService } from 'src/app/services/user.service';
import { DiaolgComponent } from '../../main-components/diaolg/diaolg.component';
import { PersonInfoDialogComponent } from '../../main-components/person-info-dialog/person-info-dialog.component';
import { AssetInfoDialogComponent } from '../asset-info-dialog/asset-info-dialog.component';
import { CreateBagDialogComponent } from '../create-bag-dialog/create-bag-dialog.component';

@Component({
  selector: 'app-view-bags',
  templateUrl: './view-bags.component.html',
  styleUrls: ['./view-bags.component.scss'],
})
export class ViewBagsComponent implements AfterViewInit {
  bagsData: Bag[] = [];
  visitedPages: number[] = [0];
  pageSize = 10;
  currentPage = 0;
  loading: boolean = false;
  displayedColumns: string[] = [
    'bagState',
    'bagName',
    'buyers',
    'sellers',
    'agents',
    'lastOpen',
    'openDate',
    'closeDate',
    'asset',
    'button',
  ];
  error: string | undefined;
  dataSource!: MatTableDataSource<Bag>;
  chosenBagID: number = -1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  asset?: Asset;
  buyers?: NewUser[];
  sellers?: NewUser[];
  agents?: NewUser[];
  bagName?: string;

  constructor(
    private bagsService: BagsService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    let personID = this.userService.getPersonID();
    if (personID)
      this.bagsService.getAllBags(this.currentPage, this.pageSize).subscribe(
        (res) => {
          this.bagsData = [...this.bagsData, ...res];
          this.dataSource = new MatTableDataSource(this.bagsData);
          this.dataSource.paginator = this.paginator;
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = res.length;
          this.dataSource.sort = this.sort;
          this.visitedPages.push(this.currentPage);
          this.loading = false;
          this.dataSource.filterPredicate = (data, filter) =>
            JSON.stringify(data).includes(filter);
        },
        (err) => {
          this.error = err.error;
          this.loading = false;
        }
      );
  }

  resetData() {
    this.bagsData = [];
    this.visitedPages = [0];
    this.currentPage = 0;
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    if (
      (!event.previousPageIndex || event.previousPageIndex < event.pageIndex) &&
      this.visitedPages.indexOf(event.pageIndex) == -1
    ) {
      console.log(`loading Data for page ${event.pageIndex}...`);
      this.loadData();
    }
  }

  openCreateBagDialog(create: boolean): void {
    {
      if (create) {
        this.resetProperties();
      }
    }
    let posted = false;
    const dialogRef = this.dialog.open(CreateBagDialogComponent, {
      width: '1100px',
      data: {
        posted: posted,
        bagId: this.chosenBagID,
        asset: this.asset,
        agents: this.agents,
        buyers: this.buyers,
        sellers: this.sellers,
        bagName: this.bagName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.resetData();
      this.resetProperties();
    });
  }

  chooseBag(
    bagID: number,
    asset?: Asset,
    agents?: NewUser[],
    buyers?: NewUser[],
    sellers?: NewUser[],
    bagName?: string
  ) {
    if (this.chosenBagID != bagID) {
      this.chosenBagID = bagID;
      this.asset = asset;
      this.agents = agents;
      this.buyers = buyers;
      this.sellers = sellers;
      this.bagName = bagName;
    } else {
      this.resetProperties();
    }
  }

  deleteBag() {
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
      if (res == 'true')
        this.bagsService.delete(this.chosenBagID).subscribe(
          () => {
            this.resetData();
            this.resetProperties();
          },
          (err) => {
            this.resetData();
            this.resetProperties();
            console.log(err);
          }
        );
      else this.loading = false;
    });
  }

  resetProperties() {
    this.chosenBagID = -1;
    this.asset = undefined;
    this.agents = undefined;
    this.buyers = undefined;
    this.sellers = undefined;
    this.bagName = undefined;
  }

  openPersonInfoDialog(person?: NewUser): void {
    if (person)
      this.dialog.open(PersonInfoDialogComponent, {
        data: {
          person: person,
        },
      });
  }

  openAssetInfoDialog(asset?: Asset): void {
    if (asset)
      this.dialog.open(AssetInfoDialogComponent, {
        data: {
          asset: asset,
        },
      });
  }
}
