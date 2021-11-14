import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.fetchMessages().subscribe();
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  onMessageSent(message: Message) {
    this.messages.push(message);
  }
}
