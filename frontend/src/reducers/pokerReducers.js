import {
    POKER_STAGE_PREFLAP,
    POKER_STAGE_FLAP,
    POKER_STAGE_TURN,
    POKER_STAGE_RIVER
} from "../constants/pokerConstants";

export const pokerReducers = (state = { }, action) => {
  switch (action.type) {
    case POKER_STAGE_PREFLAP:
      return { ...state, loading: true };

    case POKER_STAGE_PREFLAP:
      return { loading: false, user: action.payload };

    case POKER_STAGE_PREFLAP:
      return { loading: false, error: action.payload };

    case POKER_STAGE_PREFLAP:
      return { user: {} };

    default:
      return state;
  }
};
