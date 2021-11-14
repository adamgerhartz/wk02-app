import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Message } from './message.model';
import { DataStorageService } from '../shared/data-storage.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MessageResolverService implements Resolve<Message[]> {

  constructor(private dataStorageService: DataStorageService,
    private messageService: MessageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const messages = this.messageService.getMessages();

    if (messages.length === 0) {
      return this.dataStorageService.fetchMessages();
    } else {
      return messages;
    }
  }
}
