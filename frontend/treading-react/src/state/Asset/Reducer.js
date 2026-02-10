import {
  GET_ASSET_REQUEST,
  GET_USER_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_ASSET_DETAILS_REQUEST,
  GET_ASSET_DETAILS_SUCCESS,
  GET_USER_ASSET_SUCCESS,
  GET_ASSET_FAILURE,
  GET_USER_ASSET_FAILURE,
} from "./ActionTypes";

const initialState = {
  asset: null,
  userAssets: [],
  loading: false,
  error: null,
  assetDetails: null,
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSET_REQUEST:
    case GET_USER_ASSET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_ASSET_SUCCESS:
      return {
        ...state,
        asset: action.payload,
        loading: false,
        error: null,
      };

    case GET_ASSET_DETAILS_SUCCESS:
      return {
        ...state,
        assetDetails: action.payload,
        loading: false,
        error: null,
      };

    case GET_USER_ASSET_SUCCESS:
      return {
        ...state,
        userAssets: action.payload,
        loading: false,
        error: null,
      };

    case GET_ASSET_FAILURE:
    case GET_USER_ASSET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default assetReducer;
