import {AsyncStorage} from 'react-native';

const DECK_STORAGE_KEY = 'mobile-flashcards:decks'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(decks => JSON.parse(decks) || {});
}

export function getDeck (id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(decks => JSON.parse(decks) || {})
    .then(decks => decks[id]);
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }));
}

export function addCardToDeck (title, card) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: [card]
    }
  }));
}
