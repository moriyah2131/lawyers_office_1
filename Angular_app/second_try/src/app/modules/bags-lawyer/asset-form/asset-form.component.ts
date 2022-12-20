import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Asset } from 'src/app/models/asset';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.css'],
})
export class AssetFormComponent implements OnInit {
  submitted: boolean = false;
  showError: boolean = false;
  loading: boolean = false;
  success: boolean = false;
  errorMessage: string | null = null;

  assetForm = this.formBuilder.group({
    blockOrBook: ['', Validators.required],
    plotOrPage: ['', Validators.required],
    subPlot: ['', []],
    assetAddress: ['', [Validators.required, Validators.minLength(7)]],
    tikMinhal: ['', [Validators.required]],
    otherDetails: ['', []],
    // street: ['', [Validators.required]],
    // houseNumber: ['', [Validators.required]],
  });

  @Output() onSubmitEvent = new EventEmitter<Asset>();
  @Input() asset?: Asset;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.assetForm = this.formBuilder.group({
      blockOrBook: [this.asset?.blockOrBook ?? '', Validators.required],
      plotOrPage: [this.asset?.plotOrPage ?? '', Validators.required],
      subPlot: [this.asset?.subPlot ?? '', []],
      assetAddress: [
        this.asset?.assetAddress ?? '',
        [Validators.required, Validators.minLength(7)],
      ],
      tikMinhal: [this.asset?.tikMinhal ?? '', [Validators.required]],
      otherDetails: [this.asset?.otherDetails ?? '', []],
      // street: ['', [Validators.required]],
      // houseNumber: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.assetForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.assetForm.invalid) {
      return;
    }

    if (
      this.f['assetAddress'].value &&
      this.f['blockOrBook'].value &&
      this.f['plotOrPage'].value &&
      this.f['tikMinhal'].value
    ) {
      let newAsset: Asset = {
        assetAddress: this.f['assetAddress'].value,
        blockOrBook: this.f['blockOrBook'].value,
        otherDetails: this.f['otherDetails'].value ?? undefined,
        plotOrPage: this.f['plotOrPage'].value,
        subPlot: this.f['subPlot'].value ?? undefined,
        tikMinhal: this.f['tikMinhal'].value,
      };
      this.onSubmitEvent.emit(newAsset);
    }
  }

  onReset() {
    this.submitted = false;
    this.assetForm.reset();
  }
}
