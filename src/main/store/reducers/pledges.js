import { TOGGLE_PLEDGE } from "../actions/types";

export const initialState = { checked: {}, committed: {} };

export const pledgesReducer = (state = initialState, action) => {
  const pledgeId = action.payload;
  switch (action.type) {
    case TOGGLE_PLEDGE:
      const newChecked = { ...state.checked };
      const currentStatus = newChecked[pledgeId] || false;
      newChecked[pledgeId] = !currentStatus;
      return { ...state, checked: newChecked };
    default:
      return state;
  }
};
