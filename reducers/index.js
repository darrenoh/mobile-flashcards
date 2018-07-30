import {ADD_DECK, RECEIVE_DECKS} from '../actions';

function reducer (state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    default:
      return state;
  }
}

export default reducer;
