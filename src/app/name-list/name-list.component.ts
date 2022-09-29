import { Component, OnInit } from '@angular/core';
import { Card } from '../Models/card.model';
import { NameListingService } from '../Services/nameListingService/name-listing.service';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss'],
})
export class NameListComponent implements OnInit {
  cards: Card[] = [];
  constructor(private nameListingService: NameListingService) {}
  ngOnInit(): void {
    this.cards = this.nameListingService.getAllNames();
  }

  editNameInList(cardToBeEdited: Card) {
    this.nameListingService.editNameInList(cardToBeEdited);
    this.cards = this.nameListingService.getAllNames();
  }

  addNameToList(newName: string) {
    this.nameListingService.addName(newName);
    this.cards = this.nameListingService.getAllNames();
  }

  removeNameFromList(card: Card) {
    this.nameListingService.removeNameFromList(card);
    this.cards = this.nameListingService.getAllNames();
  }
}
