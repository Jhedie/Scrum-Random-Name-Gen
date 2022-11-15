import { Component, OnChanges, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Card } from '../Models/card.model';
import { NameListingService } from '../Services/nameListingService/name-listing.service';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss'],
})
export class NameListComponent implements OnInit {
  cards$: Observable<Card[]> = of([]);
  constructor(private nameListingService: NameListingService) {}
  ngOnInit(): void {
    this.updateList();
  }

  updateList(): void {
    this.cards$ = this.nameListingService.getAllNames();
  }

  editNameInList(cardToBeEdited: Card) {
    this.nameListingService.editNameInList(cardToBeEdited);
  }

  addNameToList(newName: string) {
    this.nameListingService.addName(newName);
  }

  removeNameFromList(card: Card) {
    this.nameListingService.removeNameFromList(card);
  }
}
