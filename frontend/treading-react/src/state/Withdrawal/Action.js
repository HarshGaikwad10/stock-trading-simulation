import api from "@/config/api";
import {
  ADD_PAYMENT_DETAILS_FAILURE,
  ADD_PAYMENT_DETAILS_REQUEST,
  ADD_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_FAILURE,
  GET_PAYMENT_DETAILS_REQUEST,
  GET_PAYMENT_DETAILS_SUCCESS,
  GET_WITHDRAWAL_FAILURE,
  GET_WITHDRAWAL_HISTORY_FAILURE,
  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_REQUEST,
  GET_WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAILURE,
  WITHDRAWAL_PROCEED_FAILURE,
  WITHDRAWAL_PROCEED_REQUEST,
  WITHDRAWAL_PROCEED_SUCCESS,
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
} from "./ActionTypes";


export const withdrawalRequest =
  ({ amount, jwt }) =>
  async (dispatch) => {
    dispatch({ type: WITHDRAWAL_REQUEST });

    try {
      const response = await api.post(`/api/withdrawal/${amount}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Withdrawal Response:", response.data);

      dispatch({
        type: WITHDRAWAL_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: WITHDRAWAL_FAILURE,
        error: error.message,
      });
      console.error("Error in withdrawal request:", error);
    }
  };

export const proceedWithdrawal =
  ({ id, jwt, accept }) =>
  async (dispatch) => {
    dispatch({ type: WITHDRAWAL_PROCEED_REQUEST });
    try {
      const response = await api.post(
        `/api/admin/withdrawal/${id}/proceed/${accept}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      console.log("Proceed Withdrawal Response:", response.data);

      dispatch({
        type: WITHDRAWAL_PROCEED_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error in proceeding withdrawal:", error);
      dispatch({
        type: WITHDRAWAL_PROCEED_FAILURE,
        error: error.message,
      });
    }
  };

export const getWithdrawalHistory = (jwt) => async (dispatch) => {
  dispatch({ type: GET_WITHDRAWAL_HISTORY_REQUEST });
  try {
    const response = await api.get("/api/withdrawal", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    console.log("get withdrawal history --- ", response.data);
    dispatch({
      type: GET_WITHDRAWAL_HISTORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("Error in Withdrwal History: ", error);
    dispatch({
      type: GET_WITHDRAWAL_HISTORY_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllWithdrawalRequest = (jwt) => async (dispatch) => {
  dispatch({ type: GET_WITHDRAWAL_REQUEST });

  try {
    const response = await api.get("/api/admin/withdrawal", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    console.log("get withdrawal requests ---", response.data);
    dispatch({
      type: GET_WITHDRAWAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("error ", error);
    dispatch({
      type: GET_WITHDRAWAL_FAILURE,
      payload: error.message,
    });
  }
};

export const addPaymentDetails =
  ({ paymentDetails, jwt }) =>
  async (dispatch) => {
    dispatch({ type: ADD_PAYMENT_DETAILS_REQUEST });

    try {
      const response = await api.post(`/api/payment-details`, paymentDetails, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("payment details ---- ", response.data);
      dispatch({
        type: ADD_PAYMENT_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_PAYMENT_DETAILS_FAILURE,
        payload: error.message,
      });
    }
  };

export const getPaymentDetails =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_PAYMENT_DETAILS_REQUEST });

    try {
      const response = await api.get(`/api/payment-details`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("get payment details ---- ", response.data);
      dispatch({
        type: GET_PAYMENT_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_PAYMENT_DETAILS_FAILURE,
        payload: error.message,
      });
    }
  };
