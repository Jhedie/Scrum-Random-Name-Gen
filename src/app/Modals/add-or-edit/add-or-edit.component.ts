import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/name-list/card.model';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss'],
})
export class AddOrEditComponent implements OnInit {
  nameForm!: FormGroup;
  @Input() optionName!: string;
  @Input() cardname!: string;
  @Output('submitEntry') nameEntry = new EventEmitter<string>();
  constructor(public modal: NgbModal) {}

  ngOnInit(): void {
    this.nameForm = new FormGroup({
      name: new FormControl(this.cardname, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  viewNameModal(nameModal: any) {
    this.modal.open(nameModal, { size: 'lg' });
  }

  submitEntry() {
    let newName: string = this.nameForm.get('name')?.value;
    this.nameEntry.emit(newName);
    this.nameForm.reset();
  }
}
