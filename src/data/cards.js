// Source of truth is cards.json — no duplicating data here.
// DECKS: full array of all decks (for deck picker screen later).
// CARDS: flat array of cards from the active deck (Black Deck, index 0).
import cardsData from '../../cards.json';

export const DECKS = cardsData.decks;

export const CARDS = cardsData.decks[0].cards.map(function (c) {
  return {
    red:    c.red,
    orange: c.orange,
    yellow: c.yellow,
    green:  c.green,
    blue:   c.blue,
    purple: c.purple,
  };
});
