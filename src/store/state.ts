import { Card } from 'src/app/Models/card.model';

export interface NameListState {
  storedNames: Card[];
}

const initialNameListState: NameListState = {
  storedNames: [],
};
