import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient) { }

  setContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  // http get requests handled in ../shared/data-storage-service.ts
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos: number = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(response => {
        this.contacts.splice(pos, 1);
        this.contactListChangedEvent.next(this.contacts.slice());
      })
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    newContact.id = "";
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    this.http
      .post<{ message: string, contact: Contact }>(
        "http://localhost:3000/contacts",
        newContact,
        { headers: headers })
      .subscribe(responseData => {
        this.contacts.push(responseData.contact);
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos: number = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;

    const headers = new HttpHeaders({'Content-Type':'application/json'});

    this.http
      .put(
        'http://localhost:3000/contacts/' + originalContact.id,
        newContact,
        { headers: headers })
      .subscribe(response => {
        this.contacts[pos] = newContact;
        this.contactListChangedEvent.next(this.contacts.slice());
      })
  }
}
