import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  private messages: Message[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) { }

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messageChangedEvent.next(this.messages.slice());
  }

  // http get requests handled in ../shared/data-storage-service.ts
  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    newMessage.id = "";
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    this.http
      .post<{ message: string, newMessageFromDB: Message }>(
        "http://localhost:3000/messages",
        newMessage,
        { headers: headers })
      .subscribe(responseData => {
        console.log(responseData)
        this.messages.push(responseData.newMessageFromDB)
        this.messageChangedEvent.next(this.messages.slice());
      })
  }
}
