import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Contact } from './contact.model';
import { DataStorageService } from '../shared/data-storage.service';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<Contact[]> {

  constructor(private dataStorageService: DataStorageService,
    private contactService: ContactService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const contacts = this.contactService.getContacts();

    if (contacts.length === 0) {
      return this.dataStorageService.fetchContacts();
    } else {
      return contacts;
    }
  }
}
