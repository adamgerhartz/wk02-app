import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Message } from '../../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject', {static: true}) subject: ElementRef;
  @ViewChild('msgText', {static: true}) msgText: ElementRef;
  currentSender: string = "Adam Gerhartz";

  constructor() {}

  ngOnInit(): void {
  }

  onSendMessage() {
    const text: string = this.msgText.nativeElement.value;
    const sub: string = this.subject.nativeElement.value;
  
    const message: Message = new Message(167352761, sub, text, this.currentSender);

    this.addMessageEvent.emit(message);
    this.onClear(); // clear fields after submission
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
