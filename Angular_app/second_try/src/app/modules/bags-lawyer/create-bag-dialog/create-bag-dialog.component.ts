import { Component, Inject, OnInit, ViewChildren } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Asset } from 'src/app/models/asset';
import { Login } from 'src/app/models/Login';
import { NewUser } from 'src/app/models/new-user';
import { BagsService } from 'src/app/services/bags.service';
import { FilesDialogComponent } from '../../bags/files-dialog/files-dialog.component';
import { AssetFormComponent } from '../asset-form/asset-form.component';
import { CreateBagFormComponent } from '../create-bag-form/create-bag-form.component';

@Component({
  selector: 'app-create-bag-dialog',
  templateUrl: './create-bag-dialog.component.html',
  styleUrls: ['./create-bag-dialog.component.css'],
})
export class CreateBagDialogComponent implements OnInit {
  loading: boolean = false;
  submitted: boolean = false;
  loginsRes: Login[] = [];
  forms: { index: number; userType: string; person?: NewUser }[] = [
    { index: 1, userType: 'קונה' },
    { index: 1, userType: 'מוכר' },
  ];
  agentForms: { index: number; userType: string; person?: NewUser }[] = [
    { index: 1, userType: 'בא כוח' },
  ];
  participants: NewUser[] = [];
  asset?: Asset;
  sellersIndex = 2;
  buyersIndex = 2;
  agentsIndex = 2;

  nameForm = new FormGroup({
    nameFormControl: new FormControl(this.data.bagName ?? '', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('.{2,25}-+.{2,25}$'),
    ]),
  });

  matcher = new MyErrorStateMatcher();
  @ViewChildren('child')
  private children: (CreateBagFormComponent | AssetFormComponent)[] | undefined;

  constructor(
    private bagService: BagsService,
    public dialogRef: MatDialogRef<FilesDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      posted: boolean;
      bagId: number;
      asset?: Asset;
      agents?: NewUser[];
      buyers?: NewUser[];
      sellers?: NewUser[];
      bagName?: string;
    },
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.data.asset && this.data.buyers && this.data.sellers) {
      this.forms = [];
      for (let index = 0; index < this.data.buyers.length; index++) {
        this.forms.push({
          index: index + 1,
          userType: 'קונה',
          person: this.data.buyers[index],
        });
      }
      for (let index = 0; index < this.data.sellers.length; index++) {
        this.forms.push({
          index: index + 1,
          userType: 'מוכר',
          person: this.data.sellers[index],
        });
      }

      this.buyersIndex = this.data.buyers.length + 1;
      this.sellersIndex = this.data.sellers.length + 1;
    }

    if (this.data.agents) {
      this.agentForms = [];
      for (let index = 0; index < this.data.agents.length; index++) {
        this.agentForms.push({
          index: index + 1,
          userType: 'בא כוח',
          person: this.data.agents[index],
        });
      }

      this.agentsIndex = this.data.agents.length + 1;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.participants = [];
    this.children?.forEach((child) => child.onSubmit());
  }

  pushDetails(newUser: NewUser) {
    this.participants.push(newUser);
    this.TryToPost();
  }

  setAsset(asset: Asset) {
    this.asset = asset;
    this.TryToPost();
  }

  removeForm(form: {
    index: number;
    userType: string;
    person?: NewUser | undefined;
  }) {
    let index: number = this.forms.indexOf(form);
    if (index != -1) this.forms.splice(index, 1);
  }

  removeAgentForm(agentForm: {
    index: number;
    userType: string;
    person?: NewUser | undefined;
  }) {
    let index: number = this.agentForms.indexOf(agentForm);
    if (index != -1) this.agentForms.splice(index, 1);
  }

  TryToPost() {
    if (
      !this.submitted &&
      this.asset &&
      this.nameForm?.get('nameFormControl')?.value &&
      this.participants.length == this.forms.length + this.agentForms.length
    ) {
      this.submitted = true;
      this.loading = true;
      if (this.data.bagId == -1)
        this.bagService
          .post(
            { asset: this.asset, participants: this.participants },
            this.nameForm.get('nameFormControl')?.value ?? ''
          )
          .subscribe(
            (res) => {
              this.onRes(res);
            },
            (err) => {
              this.onErr(err);
            }
          );
      else
        this.bagService
          .put(
            this.data.bagId,
            { asset: this.asset, participants: this.participants },
            this.nameForm.get('nameFormControl')?.value ?? ''
          )
          .subscribe(
            (res) => {
              this.onRes(res);
            },
            (err) => {
              this.onErr(err);
            }
          );
    }
  }

  onRes(res: any) {
    this.loginsRes = res;
    this.loading = false;
    this.data.posted = true;
  }
  onErr(err: any) {
    console.error(err);
    this.loading = false;
  }

  onPrint() {
    window.print();
  }

  onReset() {
    this.forms = [
      { index: 1, userType: 'קונה' },
      { index: 1, userType: 'מוכר' },
    ];
    this.agentForms = [{ index: 1, userType: 'בא כוח' }];
    this.children?.forEach((child) => child.onReset());
    this.buyersIndex = 2;
    this.sellersIndex = 2;
    this.agentsIndex = 2;
    this.participants = [];
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
