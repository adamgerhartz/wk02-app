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
    this.maxDocumentId = this.getMaxId();
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  storeMessages() {
    /*this.http
      .put(
        'https://cms-wdd430-f0c1c-default-rtdb.firebaseio.com/messages.json',
        JSON.stringify(this.messages),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      )
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });*/
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  private getMaxId() {
    let maxId: number = 1;

    for (const message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
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
