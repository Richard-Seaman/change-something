import {
    TOGGLE_PLEDGE
  } from '../actions/types';

export const initialState = { checked: {} };

export const pledgesReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_PLEDGE:
        const pledgeId = action.payload;
        const newChecked = { ...state.checked };
        const currentStatus = newChecked[pledgeId] || false;
        newChecked[pledgeId] = !currentStatus;
        return { ...state, checked: newChecked };
      default:
        return state;
    }
  };