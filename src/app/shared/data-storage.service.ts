import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Document } from '../documents/document.model';
import { Contact } from '../contacts/contact.model';
import { Message } from '../messages/message.model';
import { DocumentService } from '../documents/document.service';
import { ContactService } from '../contacts/contact.service';
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private documentService: DocumentService,
    private contactService: ContactService,
    private messageService: MessageService) { }

  fetchMessages() {
    return this.http
      .get<{ message: string, messages: Message[] }>('http://localhost:3000/messages')
      .pipe(
        map((responseData: any) => {
          return responseData.messages.map(message => {
            return {
              ...message
            }
          })
        }),
        tap((messages: Message[]) => {
          this.messageService.setMessages(messages);
        })
      );
  }

  fetchContacts() {
    return this.http
      .get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
      .pipe(
        map(responseData => {
          return responseData.contacts.map(contact => {
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
      .get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .pipe(
        map(responseData => {
          return responseData.documents.map(documentEl => {
            return {
              ...documentEl,
              description: documentEl.description ? documentEl.description : "",
              children: documentEl.children ? documentEl.children : []
            };
          });
        }),
        tap((documents: Document[]) => {
          this.documentService.setDocuments(documents);
        })
      );
  }
}
