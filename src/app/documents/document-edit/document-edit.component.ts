import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  id: number;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id  = +params['id'];
          if (params['id'] === null) {
            this.editMode = false;
            return;
          }
          this.originalDocument = this.documentService.getDocument(this.id.toString());

          if (!this.originalDocument) {
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      value['id'],
      value['name'],
      value['description'],
      value['url'],
      value['children']
    );
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.onCancel();
  }
}
