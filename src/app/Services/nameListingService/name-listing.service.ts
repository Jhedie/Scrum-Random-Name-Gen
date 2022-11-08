import { Injectable } from '@angular/core';
import { ReducerManagerDispatcher } from '@ngrx/store';
import { map, Observable, of, tap } from 'rxjs';
import { Card } from '../../Models/card.model';

@Injectable({
  providedIn: 'root',
})
export class NameListingService {
  private _storedCards: Card[] =
    localStorage.getItem('storedCards') != null
      ? JSON.parse(localStorage.getItem('storedCards') || '[]')
      : [];

  get storedCards(): Card[] {
    return this._storedCards;
  }
  set storedCards(newCards: Card[]) {
    this._storedCards = newCards;
    localStorage.setItem('storedCards', JSON.stringify(newCards));
  }

  getAllNames(): Observable<Card[]> {
    return of(this.storedCards);
  }
  getNumberOfNames(): number {
    return this.storedCards.length;
  }
  addName(newName: string) {
    const newCard: Card = { id: Math.random(), name: newName };
    const newCards = [...this.storedCards, newCard];

    this.storedCards = newCards;
  }

  editNameInList(newCard: Card) {
    const indexOfNewCard = this.storedCards.findIndex(
      (card) => card.id === newCard.id
    );
    const newCards = [
      ...this.storedCards.slice(0, indexOfNewCard),
      newCard,
      ...this.storedCards.slice(indexOfNewCard + 1),
    ];
    this.storedCards = newCards;
  }

  removeNameFromList(card: Card) {
    const newCards = this.storedCards.filter(
      (currentCard) => currentCard.id !== card.id
    );
    this.storedCards = newCards;
  }
}
