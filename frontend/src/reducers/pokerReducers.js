import {
  GAME_DETAILS_REQUEST,
  GAME_DETAILS_SUCCESS,
  GAME_DETAILS_FAIL,

  GAME_NEXT_ROUND_REQUEST,
  GAME_NEXT_ROUND_SUCCESS,
  GAME_NEXT_ROUND_FAIL,
} from "../constants/pokerConstants";

export const gameDetailsReducer = (state={} , action) => {
  switch (action.type) {
    case GAME_DETAILS_REQUEST:
      return { ...state, loading: true };

    case GAME_DETAILS_SUCCESS:
      return { loading: false, state: action.payload };

    case GAME_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
