import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NewUser } from 'src/app/models/new-user';

@Component({
  selector: 'app-create-bag-form',
  templateUrl: './create-bag-form.component.html',
  styleUrls: ['./create-bag-form.component.css'],
})
export class CreateBagFormComponent implements OnInit {
  submitted: boolean = false;
  showError: boolean = false;
  errorMessage: string | null = null;
  showEmailOnly: boolean = false;

  password: string = '';

  @Input() userType: string = '';
  @Input() index: string = '1';
  @Input() person?: NewUser;
  @Input() showLivingAddress: boolean = false;

  livingAddressField: string = '';

  @Output() onSubmitEvent = new EventEmitter<NewUser>();

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    IDnumber: [
      '',
      [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
    ],
    phone: [
      '',
      [Validators.required, Validators.minLength(9), Validators.maxLength(10)],
    ],
    email: ['', [Validators.required, Validators.email]],
    livingAddress: ['', [Validators.minLength(7)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.person);
    this.registerForm = this.formBuilder.group({
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
      livingAddress: [
        this.person?.livingAddress ?? '',
        [Validators.minLength(7)],
      ],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (
      (this.registerForm.invalid && !this.showEmailOnly) ||
      (this.showEmailOnly && !this.f['email'].value)
    ) {
      return;
    }

    let userTypeToPost: 'buyer' | 'seller' | 'lawyer' = 'buyer';
    switch (this.userType) {
      case 'קונה': {
        userTypeToPost = 'buyer';
        break;
      }
      case 'מוכר': {
        userTypeToPost = 'seller';
        break;
      }
      case 'בא כוח': {
        userTypeToPost = 'lawyer';
        break;
      }
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
        userType: userTypeToPost,
        livingAddress: this.f['livingAddress'].value ?? undefined,
      };
      this.onSubmitEvent.emit(newUser);
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
