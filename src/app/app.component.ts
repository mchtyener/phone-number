import { NgIf } from '@angular/common';
import { Component, inject, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountryCode, PhoneNumber } from 'libphonenumber-js';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Country } from './core/models/country.interface';
import { PhoneNumberService } from './core/services/phone-number.service';

@Component({
  selector: 'app-root',
  imports: [
    NgIf,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideNgxMask()]
})
export class AppComponent {
  phoneInputTouched: boolean = false;
  phoneNumberService: PhoneNumberService = inject(PhoneNumberService);
  getCountries: Country[] = this.phoneNumberService.getCountries();
  selectedCountry: WritableSignal<Country> = this.phoneNumberService.selectedCountry;
  inputPhone: WritableSignal<PhoneNumber | null> = this.phoneNumberService.inputPhone;

  form: UntypedFormGroup = new UntypedFormGroup({
    country: new UntypedFormControl('TR', Validators.required),
    phone: new UntypedFormControl('', [Validators.required, this.phoneNumberService.getPhoneValidator()]),
  });

  ngOnInit(): void {
    this.form.get('country')?.valueChanges.subscribe((country: CountryCode) => {
      this.form.get('phone')?.setValue('');
      this.phoneNumberService.setSelectedCountry(country);
    });
  }

  onInputFocus(): void {
    this.phoneInputTouched = true;
  }

  isPhoneInputTouched(): boolean {
    return this.phoneInputTouched;
  }

  isPhoneNumberInvalid(): boolean {
    return this.phoneInputTouched && !this.form.get('phone')?.value;
  }

  get getFormError(): ValidationErrors | null | undefined {
    return this.form.get('phone')?.errors
  }

}
