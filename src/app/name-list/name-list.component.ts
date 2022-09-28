import { Component, OnInit } from '@angular/core';
import { Card } from './card.model';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss'],
})
export class NameListComponent implements OnInit {
  cardIdCount: number = 1;
  cards: Card[] = [];

  ngOnInit(): void {
    localStorage.setItem('storedCards', JSON.stringify(this.cards));
  }

  editNameInList(newName: string) {}

  addNameToList(newName: string) {
    let newCard: Card = { id: this.cardIdCount, name: newName };
    this.cardIdCount++;
    this.cards.push(newCard);
  }

  removeNameFromList(card: Card) {
    let storedCards: Card[] =
      JSON.parse(localStorage.getItem('cards') as any) || [];
    storedCards.filter((currentCard) => currentCard.id === card.id);
    localStorage.setItem('cards', JSON.stringify(storedCards));
  }
}
