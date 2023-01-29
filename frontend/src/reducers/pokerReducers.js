import {
  GAME_DETAILS_REQUEST,
  GAME_DETAILS_SUCCESS,
  GAME_DETAILS_FAIL,
  GAME_ENTER_REQUEST,
  GAME_ENTER_SUCCESS,
  GAME_ENTER_FAIL,
  GAME_NEXT_ROUND_REQUEST,
  GAME_NEXT_ROUND_SUCCESS,
  GAME_NEXT_ROUND_FAIL,
  GAME_LEAVE_REQUEST,
  GAME_LEAVE_SUCCESS,
  GAME_LEAVE_FAIL,
} from "../constants/pokerConstants";

export const gameDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GAME_DETAILS_REQUEST:
      return { ...state, loading: true };

    case GAME_DETAILS_SUCCESS:
      return { loading: false, info: action.payload };

    case GAME_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const gameEnterReducer = (state = {}, action) => {
  switch (action.type) {
    case GAME_ENTER_REQUEST:
      return { state, loading: true };

    case GAME_ENTER_SUCCESS:
      return { loading: false, info: action.payload };

    case GAME_ENTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const gameLeaveReducer = (state = {}, action) => {
  switch (action.type) {
    case GAME_LEAVE_REQUEST:
      return { ...state, loading: true };

    case GAME_LEAVE_SUCCESS:
      return { loading: false, info: action.payload };

    case GAME_LEAVE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
