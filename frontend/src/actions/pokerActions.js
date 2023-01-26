import axios from "axios";
import {
  GAME_DETAILS_REQUEST,
  GAME_DETAILS_SUCCESS,
  GAME_DETAILS_FAIL,
  GAME_NEXT_ROUND_REQUEST,
  GAME_NEXT_ROUND_SUCCESS,
  GAME_NEXT_ROUND_FAIL,
} from "../constants/pokerConstants";


export const gameDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GAME_DETAILS_REQUEST });

    const { data } = await axios.get(
      window.location.protocol +
        "//" +
        window.location.hostname +
        `:8000/api/poker/${id}`
    );

    dispatch({ type: GAME_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GAME_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
