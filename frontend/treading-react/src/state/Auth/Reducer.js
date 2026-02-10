import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_TWO_STEP_REQUEST,
  LOGIN_TWO_STEP_SUCCESS,
  LOGIN_TWO_STEP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  VERIFY_2FA_OTP_SUCCESS,
  SEND_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_SUCCESS,
} from "./ActionTypes";

// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
//   jwt: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case REGISTER_REQUEST:
//     case LOGIN_REQUEST:
//     case GET_USER_REQUEST:
//       return { ...state, loading: true, error: null };

//     case REGISTER_SUCCESS:
//     case LOGIN_SUCCESS:
//       return { ...state, loading: false, jwt: action.payload };

//     case GET_USER_SUCCESS:
//       return { ...state, loading: false, user: action.payload, error: null };

//     case REGISTER_FAILURE:
//     case LOGIN_FAILURE:
//     case GET_USER_FAILURE:
//       return { ...state, loading: false, error: action.payload };

//     case LOGOUT:
//       return initialState;
//     default:
//       return state;
//   }
// };

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
  twoFactorRequired: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_USER_REQUEST:
    case VERIFY_OTP_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_TWO_STEP_SUCCESS:
      return { ...state, loading: false, twoFactorRequired: true };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        jwt: action.payload,
        resetSession: null,
        error: null,
      };
    case GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };

    case VERIFY_OTP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        jwt: action.payload,
        twoFactorRequired: false,
      };
    case VERIFY_2FA_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SEND_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetSession: action.payload,
      };

    case VERIFY_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetSession: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
    case VERIFY_OTP_FAILURE:
    case LOGIN_TWO_STEP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
