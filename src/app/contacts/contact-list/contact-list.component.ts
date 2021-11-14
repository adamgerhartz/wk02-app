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
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  subscription: Subscription;
  term: string = '';

  constructor(private contactService: ContactService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataStorageService.fetchContacts().subscribe();
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

  search(value: string) {
    this.term = value;
  }
}
