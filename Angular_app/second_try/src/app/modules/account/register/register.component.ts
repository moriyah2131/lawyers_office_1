import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/models/Login';
import { Register } from 'src/app/models/Register';
import { AccountService } from 'src/app/services/Account.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from '../helpers/MustMatch.validator';
//import { EmailVerificationService } from 'src/app/services/emailVerification.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/new-user';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  showError: boolean = false;
  loading: boolean = false;
  buttonVisable: boolean = true;
  success: boolean = false;
  EmailSent: boolean = false;
  verificationLoading: boolean = false;
  errorMessage: string | null = null;
  sendingEmailError: string | undefined;
  person?: NewUser;

  @Output() goToLoginEvent = new EventEmitter<boolean>();

  registerForm = this.formBuilder.group(
    {
      fax: ['', [Validators.minLength(9), Validators.maxLength(10)]],
      phone: ['', [Validators.minLength(9), Validators.maxLength(10)]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    },
    {
      validator: MustMatch('password', 'confirmPassword'),
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private userService: UserService,
    //private emailVerificationService: EmailVerificationService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.personService.getById().subscribe(
      (res?: NewUser) => {
        this.person = res;
      },
      (err) => console.error(err)
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm?.controls;
  }

  onSubmit() {
    this.submitted = true;
    let personID = this.userService.getUser()?.personId;

    // stop here if form is invalid
    if (!this.f || this.registerForm?.invalid || !personID) {
      return;
    }

    let newSubscriber: Register = {
      personId: personID,
      fax: this.f['fax'].value == '' ? undefined : this.f['fax'].value,
      secondPhone:
        this.f['phone'].value == '' ? undefined : this.f['phone'].value,
      livingAddress: `${this.f['city'].value} ,${this.f['houseNumber'].value} ${this.f['street'].value} `,
      password: this.f['password'].value,
    };

    this.loading = true;
    this.accountService.register(newSubscriber).subscribe(
      () => {
        if (personID) {
          this.userService.setPersonID(personID);
        }
      },
      (err) => {
        this.errorMessage = err.error;
        this.loading = false;
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm?.reset();
  }

  goToLogin() {
    this.goToLoginEvent.emit(true);
  }

  // sendEmail() {
  //   this.verificationLoading = true;
  //   this.emailVerificationService
  //     .sendVerificationCode(this.f['email'].value)
  //     .subscribe(
  //       () => {
  //         this.EmailSent = true;
  //         this.verificationLoading = false;
  //         this.sendingEmailError = undefined;
  //       },
  //       (err) => {
  //         debugger;
  //         this.verificationLoading = false;
  //         this.sendingEmailError = err.error;
  //       }
  //     );
  // }
}
