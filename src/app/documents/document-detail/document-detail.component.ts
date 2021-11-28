import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  documentEl: Document;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    private router: Router) {
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          this.documentEl = this.documentService.getDocument(id);
        }
      );
  }

  onView() {
    if (this.documentEl.url) {
      this.nativeWindow.open(this.documentEl.url);
    }
    console.log(this.documentEl.description);
  }

  onDelete() {
    this.documentService.deleteDocument(this.documentEl);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
