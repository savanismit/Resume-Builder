import { SET_ALERT, REMOVE_ALERT } from '../actions/types.js';

const intitialState = [];

export default function (state = intitialState, action) {
  const { type, payload } = action;
  switch (action.type) {
    case 'SET_ALERT':
      return [...state, payload];
    case 'REMOVE_ALERT':
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
