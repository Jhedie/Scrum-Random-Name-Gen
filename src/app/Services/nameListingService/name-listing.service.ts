import { Injectable } from '@angular/core';
import { Card } from '../../Models/card.model';

@Injectable({
  providedIn: 'root',
})
export class NameListingService {
  storedCards: Card[] =
    localStorage.getItem('storedCards') != null
      ? JSON.parse(localStorage.getItem('storedCards') || '[]')
      : [];
  getAllNames(): Card[] {
    return this.storedCards;
  }
  getNumberOfNames(): number {
    return this.storedCards.length;
  }
  addName(newName: string) {
    let newCard: Card = { id: this.getNumberOfNames() + 1, name: newName };
    if (localStorage.getItem('storedCards') == null) {
      let cards: Card[] = [];
      cards.push(newCard);
      localStorage.setItem('storedCards', JSON.stringify(cards));
    } else {
      let cards: Card[] = JSON.parse(
        localStorage.getItem('storedCards') || '[]'
      );
      cards.push(newCard);
      localStorage.setItem('storedCards', JSON.stringify(cards));
    }
  }

  editNameInList(newCard: Card) {
    let cards: Card[] = JSON.parse(localStorage.getItem('storedCards') || '[]');
    cards.splice(newCard.id - 1, 1, newCard);
    localStorage.setItem('storedCards', JSON.stringify(cards));
  }

  removeNameFromList(card: Card) {
    let cards: Card[] = JSON.parse(localStorage.getItem('storedCards') || '[]');
    let newStoredCards: Card[] = cards.filter(
      (currentCard) => currentCard.id !== card.id
    );
    console.log(newStoredCards);
    localStorage.setItem('storedCards', JSON.stringify(newStoredCards));
  }
}
