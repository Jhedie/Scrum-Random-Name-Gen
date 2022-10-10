import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from 'src/app/Models/card.model';

function nameIsPresentValidator(
  c: AbstractControl
): { [key: string]: boolean } | null {
  let cardExists: string = JSON.parse(
    localStorage.getItem('storedCards') || '[]'
  )
    .map((card: Card) => card.name)
    .filter(
      (name: string) =>
        c.value === name && (c.value !== ' ' || c.value !== null)
    );
  if (cardExists.length > 0) {
    return { nameExists: true };
  }
  return null;
}

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss'],
})
export class AddOrEditComponent implements OnInit {
  nameForm!: FormGroup;
  @Input() optionButton!: string;
  @Input() optionName!: string;
  @Input() card!: Card;
  @Output('submitEntry') nameEntry = new EventEmitter<string>();
  @Output('editEntry') nameEditEntry = new EventEmitter<Card>();
  constructor(public modal: NgbModal) {}

  ngOnInit(): void {
    this.nameForm = new FormGroup({
      name: new FormControl(this.card?.name, [
        Validators.required,
        Validators.minLength(3),
        nameIsPresentValidator,
      ]),
    });
  }

  viewNameModal(nameModal: any): void {
    this.modal.open(nameModal, { size: 'lg' });
  }

  editEntry(): void {
    let newEntry: Card = {
      id: this.card.id,
      name: this.nameForm.get('name')?.value,
    };
    this.nameEditEntry.emit(newEntry);
  }

  submitEntry(): void {
    if (this.optionName === 'Edit Name') {
      this.editEntry();
    } else {
      let newName: string = this.nameForm.get('name')?.value;
      this.nameEntry.emit(newName);
      this.nameForm.reset();
    }
  }
}
