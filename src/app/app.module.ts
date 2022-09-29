import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerSectionComponent } from './spinner-section/spinner-section.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NameDeleteComponent } from './Modals/name-delete/name-delete.component';
import { AddOrEditComponent } from './Modals/add-or-edit/add-or-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NameListComponent } from './name-list/name-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NameListComponent,
    SpinnerSectionComponent,
    NameDeleteComponent,
    AddOrEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
