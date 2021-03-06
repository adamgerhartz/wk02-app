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
    this.documentListChangedEvent.next(this.documents.slice());
  }

  // http get requests handled in ../shared/data-storage-service.ts
  getDocuments(): Document[] {
    return this.documents.slice();
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

    const pos: number = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe(response => {
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    newDocument.id = "";
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    this.http
      .post<{ message: string, document: Document }>(
        "http://localhost:3000/documents",
        newDocument,
        { headers: headers })
      .subscribe(responseData => {
        this.documents.push(responseData.document);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos: number = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({'Content-Type':'application/json'});

    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers })
      .subscribe(response => {
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
      })
  }
}
