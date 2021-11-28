import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  groupContacts: Contact[] = [];
  contact: Contact;
  editMode: boolean = false;
  isInvalidGroupContact: boolean = false;
  id: string;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (params['id'] === null) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(this.id);

          if (!this.originalContact) {
            return;
          }
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          if (this.contact['group']) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact['group']));
          }
        }
      );
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  async onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      value['id'],
      value['name'],
      value['email'],
      value['phone'],
      value['imageUrl'],
      value['group'] !== 'undefinded' ? this.groupContacts : null
    );
    if (this.editMode) {
      await this.contactService.updateContact(this.originalContact, newContact);
    } else {
      await this.contactService.addContact(newContact);
    }
    this.onCancel();
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    this.isInvalidGroupContact = false;
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      this.isInvalidGroupContact = true;
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
