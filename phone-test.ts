import { MetadataJson } from 'libphonenumber-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js/core';
import metadata from './metadata.custom.json';

const phone = parsePhoneNumberFromString('+905541231212', 'TR', metadata as MetadataJson);

if (phone) {
  console.log('Valid:', phone.isValid());
  console.log('Type:', phone.getType());
  console.log('Intl:', phone.formatInternational());
  console.log('Natl:', phone.formatNational());
}

// doyayı çalıştırabilmek için terminale "npx tsx phone-test.ts"  yazmanız yeterli