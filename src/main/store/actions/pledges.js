import * as actionTypes from './types';

export const togglePledge = pledgeId => {
  return {
    type: actionTypes.TOGGLE_PLEDGE,
    payload: pledgeId
  };
};
