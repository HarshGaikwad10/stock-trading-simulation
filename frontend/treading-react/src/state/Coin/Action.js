import api from "@/config/api";
import {
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_TOP_50_COINS_FAILURE,
  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_SUCCESS,
  SEARCH_COIN_FAILURE,
  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
} from "./ActionTypes";
import axios from "axios";

export const getCoinList = (page,jwt) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const { data } = await axios.get(`${baseUrl}/coins?page=${page}`,{
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

    console.log("Coin List Data:", data);
    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.error("error: ", error.message);
    dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
  }
};

export const getTop50CoinList = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COINS_REQUEST });
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const { data } = await axios.get(`${baseUrl}/coins/top50`,
  {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
    console.log("top 50 coins", data);
    dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload: data });
  } catch (error) {
    console.error("error: ", error.message);
    dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message });
  }
};

export const fetchMarketChart =
  ({ coinId, days, jwt }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_MARKET_CHART_REQUEST });

    try {
      const response = await api.get(`/coins/${coinId}/chart?days=${days}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("error: ", error.message);
      dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
    }
  };

// export const fetchCoinById = (coinId) => async (dispatch) => {
//   dispatch({ type: FETCH_COIN_BY_ID_REQUEST });
//   const baseUrl = import.meta.env.VITE_API_BASE_URL;

//   try {
//     const response = await axios.get(`${baseUrl}/coins/${coinId}`, {
//   headers: {
//     Authorization: `Bearer ${jwt}`,
//   },
// });
//     console.log("coins by id", response.data);
//     dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
//   } catch (error) {
//     console.error("error: ", error.message);
//     dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message });
//   }
// };

export const fetchCoinById = ({coinId,jwt}) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_BY_ID_REQUEST });
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await axios.get(`${baseUrl}/coins/${coinId}`, {
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
});
    console.log("coins by id", response.data);
    dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("error: ", error.message);
    dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message });
  }
};

export const fetchCoinDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_COIN_DETAILS_REQUEST });

    try {
      const response = await api.get(`/coins/details/${coinId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("coin details", response.data);
      dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("error: ", error.message);
      dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message });
    }
  };

  export const searchCoin = (keyword) => async(dispatch)=> {
    dispatch({type: SEARCH_COIN_REQUEST});
    
    try {
        const response = await api.get(`/coins/search?q=${keyword}`);   
        console.log("search coin", response.data);
        dispatch({type: SEARCH_COIN_SUCCESS, payload: response.data});
        
    }catch (error) {
        console.error("error: ",error.message);
        dispatch({type: SEARCH_COIN_FAILURE, payload: error.message});
    }
}