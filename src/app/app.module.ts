import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpinnerSectionComponent } from './spinner-section/spinner-section.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NameDeleteComponent } from './Modals/name-delete/name-delete.component';
import { AddOrEditComponent } from './Modals/add-or-edit/add-or-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NameListComponent } from './name-list/name-list.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    NameListComponent,
    SpinnerSectionComponent,
    NameDeleteComponent,
    AddOrEditComponent,
  ],
  imports: [BrowserModule, NgbModule, ReactiveFormsModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
