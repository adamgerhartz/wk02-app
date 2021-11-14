import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Document } from './document.model';
import { DataStorageService } from '../shared/data-storage.service';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentResolverService implements Resolve<Document[]> {

  constructor(private dataStorageService: DataStorageService,
    private documentService: DocumentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const documents = this.documentService.getDocuments();

    if (documents.length === 0) {
      return this.dataStorageService.fetchDocuments();
    } else {
      return documents;
    }
  }
}
