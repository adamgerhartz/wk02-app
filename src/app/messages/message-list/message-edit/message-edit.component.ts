import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Message } from '../../message.model';
import { MessageService } from '../../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: true}) subject: ElementRef;
  @ViewChild('msgText', {static: true}) msgText: ElementRef;
  currentSenderId: string = "19";

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
  }

  onSendMessage() {
    const text: string = this.msgText.nativeElement.value;
    const sub: string = this.subject.nativeElement.value;

    const message: Message = new Message('167352761', sub, text, this.currentSenderId);

    this.messageService.addMessage(message);
    this.onClear(); // clear fields after submission
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
