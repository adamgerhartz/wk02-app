import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    if (contacts.length === 0 || term === '') {
      return contacts;
    }
    const resultArray = [];
    for (const contact of contacts) {
      if (contact.name.toLowerCase().includes(term.toLowerCase())) {
        resultArray.push(contact);
      }
    }
    return resultArray;
  }

}
