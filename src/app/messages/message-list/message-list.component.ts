import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(190234023, "Subject 1", "Test message 1", "Rex Barzee"),
    new Message(90212321023, "Subject 2", "Test message 2", "Batman"),
    new Message(134023, "Subject 3", "Test message 3", "R. Kent Jackson"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onMessageSent(message: Message) {
    this.messages.push(message);
  }
}
