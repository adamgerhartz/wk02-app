import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Document } from './document.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) { }

  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.maxDocumentId = this.getMaxId();
    this.documents.sort();
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  storeDocuments() {
    this.http
      .put(
        'https://cms-wdd430-f0c1c-default-rtdb.firebaseio.com/documents.json',
        JSON.stringify(this.documents),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    console.log(document);
    const pos: number = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    console.log(this.documents);
    this.storeDocuments();
  }

  private getMaxId(): number {
    let maxId: number = 1;

    for (const document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos: number = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }
}
