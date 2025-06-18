import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Observable } from 'rxjs';
import { Country } from './core/models/country.interface';
import { PhoneNumberService } from './core/services/phone-number.service';


@Component({
  selector: 'app-root',
  imports: [
    NgIf,
    AsyncPipe,
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
  phoneNumberService: PhoneNumberService = inject(PhoneNumberService)
  selectedCountry$: Observable<Country> = this.phoneNumberService.selectedCountry$;
  getCountries: Country[] = this.phoneNumberService.getCountries();

  form: UntypedFormGroup = new UntypedFormGroup({
    country: new UntypedFormControl('TR', Validators.required),
    phone: new UntypedFormControl('', [Validators.required, this.phoneNumberService.getPhoneValidator()]),
  });

  ngOnInit(): void {
    this.form.get('country')?.valueChanges.subscribe(country => {
      this.form.get('phone')?.setValue('')
      this.phoneNumberService.setSelectedCountry(country);
      const phoneControl = this.form.get('phone');
      phoneControl?.setValidators([Validators.required, this.phoneNumberService.getPhoneValidator()]);
      phoneControl?.updateValueAndValidity();
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

}
