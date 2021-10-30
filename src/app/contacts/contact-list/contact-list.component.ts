import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  subscription: Subscription;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewContact() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
