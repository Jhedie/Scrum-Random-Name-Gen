import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/Models/card.model';

@Component({
  selector: 'app-name-delete',
  templateUrl: './name-delete.component.html',
  styleUrls: ['./name-delete.component.scss'],
})
export class NameDeleteComponent {
  @Input() card!: Card;
  constructor(public modal: NgbModal) {}
  @Output('deleteEntry') deletedEntry = new EventEmitter<Card>();

  viewDeleteModal(deleteModal: any) {
    this.modal.open(deleteModal, { size: 'lg' });
  }

  deleteEntry() {
    this.deletedEntry.emit(this.card);
    this.modal.dismissAll();
  }
}
