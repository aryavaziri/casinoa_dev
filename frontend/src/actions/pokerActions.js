import axios from "axios";
import {
  TABLE_LIST_REQUEST,
  TABLE_LIST_SUCCESS,
  TABLE_LIST_FAIL,
  TABLE_DETAILS_REQUEST,
  TABLE_DETAILS_SUCCESS,
  TABLE_DETAILS_FAIL,
} from "../constants/tableConstants";


export const check = (id) => async (dispatch) => {
  try {
    dispatch({ type: TABLE_DETAILS_REQUEST });

    const { data } = await axios.get(
      window.location.protocol +
        "//" +
        window.location.hostname +
        `:8000/api/tables/${id}`
    );

    dispatch({ type: TABLE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TABLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
