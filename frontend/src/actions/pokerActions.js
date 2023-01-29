import axios from "axios";
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

export const gameDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GAME_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.get(
      window.location.protocol +
        "//" +
        window.location.hostname +
        `:8000/api/poker/${id}`,
      config
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

export const gameEnter = (id, deposite) => async (dispatch, getState) => {
  try {
    dispatch({ type: GAME_ENTER_REQUEST });
    const {userLogin: { userInfo }} = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.put(window.location.protocol + "//" + window.location.hostname + `:8000/api/poker/${id}/enter/`, deposite, config);
    dispatch({ type: GAME_DETAILS_SUCCESS, payload: data });
    dispatch({ type: GAME_ENTER_SUCCESS});
  } catch (error) {
    dispatch({
      type: GAME_ENTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const gameLeave = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GAME_LEAVE_REQUEST });
    const {userLogin: { userInfo }} = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.get(window.location.protocol + "//" + window.location.hostname + `:8000/api/poker/${id}/leave/`, config);
    dispatch({ type: GAME_DETAILS_SUCCESS, payload: data });
    dispatch({ type: GAME_LEAVE_SUCCESS});
    // dispatch({ type: GAME_LEAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GAME_LEAVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
