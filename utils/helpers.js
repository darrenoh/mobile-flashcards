import {AsyncStorage} from 'react-native';

const DECK_STORAGE_KEY = 'mobile-flashcards:decks'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(decks => JSON.parse(decks) || {});
}

export function saveDeck (deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }));
}
