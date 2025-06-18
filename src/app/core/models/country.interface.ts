import { CountryCode } from 'libphonenumber-js';

export interface Country {
  code: CountryCode;
  name: string;
  countryCode: string;
  mask: string;
  placeholder: string;
  flag: string;
}