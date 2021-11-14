import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactStartComponent } from './contacts/contact-start/contact-start.component';
import { DocumentStartComponent } from './documents/document-start/document-start.component';
import { DocumentResolverService } from './documents/document-resolver.service';
import { ContactResolverService } from './contacts/contact-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children: [
    { path: '', component: DocumentStartComponent },
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailComponent, resolve: [DocumentResolverService]},
    { path: ':id/edit', component: DocumentEditComponent, resolve: [DocumentResolverService]}
  ] },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent, children: [
    { path: '', component: ContactStartComponent },
    { path: 'new', component: ContactEditComponent },
    { path: ':id', component: ContactDetailComponent, resolve: [ContactResolverService] },
    { path: ':id/edit', component: ContactEditComponent, resolve: [ContactResolverService] }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
