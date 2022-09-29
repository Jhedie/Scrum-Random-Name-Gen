import { Injectable } from '@angular/core';
import { Card } from '../../Models/card.model';

@Injectable({
  providedIn: 'root',
})
export class NameListingService {
  cardIdCount: number = 1;

  getAllNames(): Card[] {
    if (localStorage.getItem('storedCards') != null) {
      return JSON.parse(localStorage.getItem('storedCards') as any);
    } else {
      return [];
    }
  }
  addName(newName: string) {
    let newCard: Card = { id: this.cardIdCount, name: newName };
    if (localStorage.getItem('storedCards') == null) {
      let cards: Card[] = [];
      cards.push(newCard);
      localStorage.setItem('storedCards', JSON.stringify(cards));
    } else {
      let cards: Card[] = JSON.parse(
        localStorage.getItem('storedCards') as any
      );
      localStorage.setItem('storedCards', JSON.stringify(cards));
      this.cardIdCount++;
    }
  }

  editNameInList(newCard: Card) {
    let cards: Card[] = JSON.parse(localStorage.getItem('storedCards') as any);
    cards.splice(newCard.id - 1, 1, newCard);
    localStorage.setItem('storedCards', JSON.stringify(cards));
  }

  removeNameFromList(card: Card) {
    let cards: Card[] = JSON.parse(localStorage.getItem('storedCards') as any);
    cards = cards.filter((currentCard) => currentCard.id - 1 === card.id);
    localStorage.setItem('storedCards', JSON.stringify(cards));
    this.cardIdCount = this.cardIdCount > 2 ? this.cardIdCount - 1 : 1;
  }
}
