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

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  subscription: Subscription;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
  }

  // We do this to remove all possible memory leaks. Angular doesn't handle unsubscribing automatically on rxjs Observables like it does with built-in Observables
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
