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
import { NameListingService } from 'src/app/Services/nameListingService/name-listing.service';

const storedCards = localStorage.getItem(JSON.parse('storedCards')) || [];

// function nameIsPresentValidator(param: any): ValidatorFn {
//   return (c: AbstractControl): { [key: string]: boolean } | null => {
//     storedCards.forEach(card => {
//       if (c.value === card.name) {
//         return {'nameExists': true}
//       }

//     })
//   };
// }
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
  constructor(
    public modal: NgbModal,
    private nameListingService: NameListingService
  ) {}

  ngOnInit(): void {
    this.nameForm = new FormGroup({
      name: new FormControl(this.card?.name, [
        Validators.required,
        Validators.minLength(3),
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
