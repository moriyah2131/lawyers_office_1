import {
  Component,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Bag } from 'src/app/models/Bag';
import { BagsService } from 'src/app/services/bags.service';
import { UserService } from 'src/app/services/user.service';
import { NewUser } from 'src/app/models/new-user';
import { TasksListComponent } from '../tasks-list/tasks-list.component';

@Component({
  selector: 'app-all-tasks-list',
  templateUrl: './all-tasks-list.component.html',
  styleUrls: ['./all-tasks-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AllTasksListComponent {
  bagsData: Bag[] = [];
  visitedPages: number[] = [0];
  pageSize = 10;
  currentPage = 0;
  loading: boolean = false;
  displayedColumns: string[] = ['bagName'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Bag | undefined | null;
  error: string | undefined;
  dataSource!: MatTableDataSource<Bag>;
  lawyersList: NewUser[] = [];
  allowSensitiveActions: boolean = false;
  openFreeFilter: boolean = false;
  filterTasksValue: string = '';

  @Output() totalTasks: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren(TasksListComponent) tasksList!: QueryList<TasksListComponent>;

  // @ViewChild(TasksListComponent) mainTasksList!: TasksListComponent;

  constructor(
    private bagsService: BagsService,
    private userService: UserService
  ) {}

  ngAfterViewInit(): void {
    this.allowSensitiveActions = this.getUserType() == 'lawyer';
    this.loadData();
  }

  onPersonChange(person?: NewUser, bagId?: number) {
    this.tasksList.forEach((element) => {
      element.onPersonChange(person, bagId);
    });
  }

  getParticipants(bag: Bag): NewUser[] {
    let participants: NewUser[] = [];
    bag?.agents?.forEach((agent) => {
      if (agent) participants.push(agent);
    });
    bag?.buyers?.forEach((buyer) => {
      if (buyer) participants.push(buyer);
    });
    bag?.sellers?.forEach((seller) => {
      if (seller) participants.push(seller);
    });
    return participants;
  }

  loadData() {
    this.loading = true;
    let personID = this.userService.getPersonID();
    if (personID)
      if (this.getUserType() == 'lawyer')
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
          },
          (err) => {
            this.error = err.error;
            this.loading = false;
          }
        );
      else
        this.bagsService
          .getBagsByIDs(this.userService.getUser()?.bagsIDs ?? [])
          .subscribe(
            (res) => {
              this.bagsData = [...this.bagsData, ...res];
              this.dataSource = new MatTableDataSource(this.bagsData);
              this.dataSource.paginator = this.paginator;
              this.paginator.pageIndex = this.currentPage;
              this.paginator.length = res.length;
              this.dataSource.sort = this.sort;
              this.visitedPages.push(this.currentPage);
              this.loading = false;
            },
            (err) => {
              this.error = err.error;
              this.loading = false;
            }
          );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyTasksFilter(event: Event | string) {
    this.filterTasksValue = !(typeof event === 'string')
      ? (event.target as HTMLInputElement).value
      : event;
    this.tasksList.forEach((tl) => tl.sortTasks());
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

  getUserType(): string {
    let userType = this.userService.getUser()?.userType;
    switch (userType?.toUpperCase()) {
      case 'LAWYER':
        return 'lawyer';
      case 'CUSTOMER':
        return 'customer';
    }
    return '';
  }
}
