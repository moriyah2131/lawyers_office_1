import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewUser } from 'src/app/models/new-user';
import { AccountService } from 'src/app/services/Account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lawyer-account',
    templateUrl: './lawyer-account.component.html',
    styleUrls: ['./lawyer-account.component.scss'],
  })
  export class LawyerAccountComponent implements OnInit {
    submitted: boolean = false;
    showError: boolean = false;
    errorMessage: string | null = null;
    showEmailOnly: boolean = false;

    @Input() userType: string = '';
    @Input() index: string = '1';
    @Input() person?: NewUser;

    @Output() onSubmitEvent = new EventEmitter<NewUser>();
    newLawyerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      IDnumber: [  '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      phone: [  '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(10)],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  
    constructor(private formBuilder: FormBuilder,
        private accountServise:AccountService,
        private router: Router) {}
  
    ngOnInit() {
        this.newLawyerForm = this.formBuilder.group({
          firstName: [this.person?.firstName ?? '', Validators.required],
          lastName: [this.person?.lastName ?? '', Validators.required],
          IDnumber: [
            this.person?.tz ?? '',
            [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
          ],
          phone: [
            this.person?.phone ?? '',
            [
              Validators.required,
              Validators.minLength(9),
              Validators.maxLength(10),
            ],
          ],
          email: [
            this.person?.email ?? '',
            [Validators.required, Validators.email],
          ],
        });
      }
    
      // convenience getter for easy access to form fields
      get f() {
        return this.newLawyerForm.controls;
      }

      onSubmit() {
        this.submitted = true;
    
        // stop here if form is invalid
        if (this.newLawyerForm.invalid) {
          return;
        }
        if (this.f['email'].value) {
            let newUser: NewUser = {
              id: this.person?.id,
              email: this.f['email'].value,
              firstName: this.f['firstName'].value ?? undefined,
              lastName: this.f['lastName'].value ?? undefined,
              tz: this.showEmailOnly
                ? undefined
                : this.f['IDnumber'].value ?? undefined,
              phone: this.f['phone'].value ?? undefined,
            userType:'lawyer'};
       
          this.accountServise.postLawyer(newUser).subscribe(
            (res)=>{
              alert("עורך הדין נשמר בהצלחה");
              this.router.navigateByUrl("/lawyer-account/lawyerlist");
            },
            (err) => {
                alert("עורך הדין נשמר בהצלחה");
                this.router.navigateByUrl("/lawyer-account/lawyerlist");
              }
          );
        
      }
    }

onReset() {
    this.submitted = false;
    this.newLawyerForm.reset();
  }
}