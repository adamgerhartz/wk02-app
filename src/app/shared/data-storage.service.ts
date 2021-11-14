import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Document } from '../documents/document.model';
import { Contact } from '../contacts/contact.model';
import { DocumentService } from '../documents/document.service';
import { ContactService } from '../contacts/contact.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private documentService: DocumentService,
    private contactService: ContactService) { }

  fetchContacts() {
    return this.http
      .get<Contact[]>('https://cms-wdd430-f0c1c-default-rtdb.firebaseio.com/contacts.json')
      .pipe(
        map(contacts => {
          return contacts.map(contact => {
            return {
              ...contact,
              group: contact.group ? contact.group : []
            };
          });
        }),
        tap((contacts: Contact[]) => {
          this.contactService.setContacts(contacts);
        })
      );

  }

  fetchDocuments() {
    return this.http
      .get<Document[]>('https://cms-wdd430-f0c1c-default-rtdb.firebaseio.com/documents.json')
      .pipe(
        map(documents => {
          return documents.map(document => {
            return {
              ...document,
              children: document.children ? document.children : [],
              description: document.description ? document.description : ''
            };
          });
        }),
        tap((documents: Document[]) => {
          this.documentService.setDocuments(documents);
        })
      );
  }
}
