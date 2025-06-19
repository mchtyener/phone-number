import { Injectable, signal } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CountryCode, PhoneNumber } from 'libphonenumber-js';
import { MetadataJson, parsePhoneNumberFromString } from 'libphonenumber-js/core';

import metadata from '../../../../metadata.custom.json';
import { phoneNumberData } from '../data/phone-number-data';
import { Country } from '../models/country.interface';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {
  private countries: Country[] = phoneNumberData;

  selectedCountry = signal<Country>(this.countries[0]);

  inputPhone?: PhoneNumber;

  getCountries(): Country[] {
    return this.countries;
  }

  setSelectedCountry(code: CountryCode): void {
    const country = this.countries.find(c => c.code === code) ?? this.countries[0];
    this.selectedCountry.set(country);
  }

  getPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return null;

      const selectedCountry = this.selectedCountry();
      if (!selectedCountry?.code || !selectedCountry?.countryCode) {
        return { invalidCountry: { value } };
      }

      const cleanedNumber = value.replace(/[\s-]/g, '');
      const fullNumber = `${selectedCountry.countryCode}${cleanedNumber}`;

      try {
        this.inputPhone = parsePhoneNumberFromString(fullNumber, selectedCountry.code, metadata as MetadataJson);

        if (!this.inputPhone || !this.inputPhone.isValid()) {
          return { invalidPhone: { value: fullNumber } };
        }

        const numberType = this.inputPhone.getType();

        if (numberType !== 'MOBILE') {
          return { invalidPhoneType: { value: fullNumber } };
        }

        return null;
      } catch (error) {
        return { invalidPhone: { value: fullNumber } };
      }
    };
  }
}
