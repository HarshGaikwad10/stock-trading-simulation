import axios from "axios";
import { toastSuccess, toastError } from "@/utils/toast";
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
  SEND_2FA_OTP_REQUEST,
  SEND_2FA_OTP_SUCCESS,
  SEND_2FA_OTP_FAILURE,
  VERIFY_2FA_OTP_REQUEST,
  VERIFY_2FA_OTP_SUCCESS,
  VERIFY_2FA_OTP_FAILURE,
  SEND_RESET_PASSWORD_REQUEST,
  SEND_RESET_PASSWORD_SUCCESS,
  SEND_RESET_PASSWORD_FAILURE,
  VERIFY_RESET_PASSWORD_REQUEST,
  VERIFY_RESET_PASSWORD_SUCCESS,
  VERIFY_RESET_PASSWORD_FAILURE,
} from "./ActionTypes";

// export const register =
//   ({ data, navigate }) =>
//   async (dispatch) => {
//     dispatch({ type: REGISTER_REQUEST });
//     const baseUrl = import.meta.env.VITE_API_BASE_URL;

//     try {
//       const response = await axios.post(`${baseUrl}/auth/signup`, data);
//       const user = response.data;
//       console.log("Registration successful:", user);
//       dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
//       localStorage.setItem("jwt", user.jwt);
//       navigate("/");
//     } catch (error) {
//       dispatch({ type: REGISTER_FAILURE, payload: error.message });
//       console.error("Registration failed:", error.message);
//     }
//   };
export const register =
  ({ data, navigate }) =>
  async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await axios.post(`${baseUrl}/auth/signup`, data);
      const user = response.data;

      dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
      localStorage.setItem("jwt", user.jwt);

      toastSuccess("Account created successfully 🎉");
      navigate("/");
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });

      toastError(
        error.response?.data?.message || "Registration failed"
      );
    }
  };


// export const login =
//   ({ data, navigate, setTwoFactorSession }) =>
//   async (dispatch) => {
//     dispatch({ type: LOGIN_REQUEST });
//     const baseUrl = import.meta.env.VITE_API_BASE_URL;

//     try {
//       const response = await axios.post(`${baseUrl}/auth/signin`, data);
//       const res = response.data;
//       dispatch({ type: LOGIN_TWO_STEP_REQUEST });

//       // 🔒 Two-factor flow
//       if (res.twoFactorAuthEnabled) {
//         dispatch({ type: LOGIN_TWO_STEP_SUCCESS });
//         setTwoFactorSession(res.session); // store session id
//         return;
//       }

//       // ✅ Normal login
//       dispatch({ type: LOGIN_SUCCESS, payload: res.jwt });
//       localStorage.setItem("jwt", res.jwt);
//       navigate("/");
//     } catch (error) {
//       dispatch({ type: LOGIN_FAILURE, payload: error.message });
//     }
//   };

export const login =
  ({ data, navigate, setTwoFactorSession }) =>
  async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await axios.post(`${baseUrl}/auth/signin`, data);
      const res = response.data;

      dispatch({ type: LOGIN_TWO_STEP_REQUEST });

      // 🔒 Two-factor flow
      if (res.twoFactorAuthEnabled) {
        dispatch({ type: LOGIN_TWO_STEP_SUCCESS });
        toastSuccess("OTP sent to your email 📩");
        setTwoFactorSession(res.session);
        return;
      }

      // ✅ Normal login
      dispatch({ type: LOGIN_SUCCESS, payload: res.jwt });
      localStorage.setItem("jwt", res.jwt);

      toastSuccess("Login successful 🚀");
      navigate("/");
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });

      const status = error.response?.status;
      if (status === 401) {
        toastError("❌ Wrong password");
      } else if (status === 404) {
        toastError("User not found");
      } else {
        toastError("Login failed");
      }
    }
  };

// export const verifyLoginOtp =
//   ({ otp, sessionId, navigate }) =>
//   async (dispatch) => {
//     dispatch({ type: VERIFY_OTP_REQUEST });
//     const baseUrl = import.meta.env.VITE_API_BASE_URL;

//     try {
//       const response = await axios.post(
//         `${baseUrl}/auth/two-factor/otp/${otp}?id=${sessionId}`,
//       );

//       const res = response.data;

//       dispatch({ type: VERIFY_OTP_SUCCESS, payload: res.jwt });
//       localStorage.setItem("jwt", res.jwt);
//       navigate("/");
//     } catch (error) {
//       dispatch({ type: VERIFY_OTP_FAILURE, payload: error.message });
//     }
//   };

export const verifyLoginOtp =
  ({ otp, sessionId, navigate }) =>
  async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await axios.post(
        `${baseUrl}/auth/two-factor/otp/${otp}?id=${sessionId}`
      );

      const res = response.data;

      dispatch({ type: VERIFY_OTP_SUCCESS, payload: res.jwt });
      localStorage.setItem("jwt", res.jwt);

      toastSuccess("OTP verified ✅ Logged in");
      navigate("/");
    } catch (error) {
      dispatch({ type: VERIFY_OTP_FAILURE, payload: error.message });
      toastError("Invalid or expired OTP");
    }
  };

// SEND OTP FOR ENABLING 2FA
export const sendTwoFactorOtp =
  ({ verificationType = "EMAIL" }) =>
  async (dispatch) => {
    dispatch({ type: SEND_2FA_OTP_REQUEST });
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const jwt = localStorage.getItem("jwt");

    try {
      await axios.post(
        `${baseUrl}/api/users/verification/${verificationType}/send-otp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      dispatch({ type: SEND_2FA_OTP_SUCCESS });
    } catch (error) {
      dispatch({
        type: SEND_2FA_OTP_FAILURE,
        payload: error.message,
      });
    }
  };

// VERIFY OTP & ENABLE 2FA
export const verifyEnableTwoFactor =
  ({ otp }) =>
  async (dispatch) => {
    dispatch({ type: VERIFY_2FA_OTP_REQUEST });
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const jwt = localStorage.getItem("jwt");

    try {
      const response = await axios.patch(
        `${baseUrl}/api/users/enable-two-factor/verify-otp/${otp}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      dispatch(getUser(jwt));
      dispatch({
        type: VERIFY_2FA_OTP_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: VERIFY_2FA_OTP_FAILURE,
        payload: error.message,
      });
    }
  };

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const response = await axios.get(`${baseUrl}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user = response.data;
    console.log(user);
    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
    console.error(error);
  }
};

// export const sendForgotPasswordOtp =
//   ({ email }) =>
//   async (dispatch) => {
//     dispatch({ type: SEND_RESET_PASSWORD_REQUEST });
//     const baseUrl = import.meta.env.VITE_API_BASE_URL;

//     try {
//       const response = await axios.post(
//         `${baseUrl}/auth/users/reset-password/send-otp`,
//         {
//           sendTo: email,
//           verificationType: "EMAIL",
//         }
//       );

//       dispatch({
//         type: SEND_RESET_PASSWORD_SUCCESS,
//         payload: response.data.session, // sessionId
//       });
//     } catch (error) {
//       dispatch({
//         type: SEND_RESET_PASSWORD_FAILURE,
//         payload: error.message,
//       });
//     }
//   };

export const sendForgotPasswordOtp =
  ({ email }) =>
  async (dispatch) => {
    dispatch({ type: SEND_RESET_PASSWORD_REQUEST });
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await axios.post(
        `${baseUrl}/auth/users/reset-password/send-otp`,
        {
          sendTo: email,
          verificationType: "EMAIL",
        }
      );

      dispatch({
        type: SEND_RESET_PASSWORD_SUCCESS,
        payload: response.data.session,
      });

      toastSuccess("OTP sent to your email 📩");
    } catch (error) {
      dispatch({
        type: SEND_RESET_PASSWORD_FAILURE,
        payload: error.message,
      });

      toastError("Email not registered");
    }
  };

  // export const resetPassword =
  // ({ sessionId, otp, password, navigate }) =>
  // async (dispatch) => {
  //   dispatch({ type: VERIFY_RESET_PASSWORD_REQUEST });
  //   const baseUrl = import.meta.env.VITE_API_BASE_URL;

  //   try {
  //     await axios.patch(
  //       `${baseUrl}/auth/users/reset-password/verify-otp?id=${sessionId}`,
  //       { otp, password }
  //     );

  //     dispatch({ type: VERIFY_RESET_PASSWORD_SUCCESS });
  //     navigate("/signin");
  //   } catch (error) {
  //     dispatch({
  //       type: VERIFY_RESET_PASSWORD_FAILURE,
  //       payload: error.message,
  //     });
  //   }
  // };

export const resetPassword =
  ({ sessionId, otp, password, navigate }) =>
  async (dispatch) => {
    dispatch({ type: VERIFY_RESET_PASSWORD_REQUEST });
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      await axios.patch(
        `${baseUrl}/auth/users/reset-password/verify-otp?id=${sessionId}`,
        { otp, password }
      );

      dispatch({ type: VERIFY_RESET_PASSWORD_SUCCESS });

      toastSuccess("Password reset successfully 🔐");
      navigate("/signin");
    } catch (error) {
      dispatch({
        type: VERIFY_RESET_PASSWORD_FAILURE,
        payload: error.message,
      });

      toastError("Invalid OTP or session expired");
    }
  };

// export const logout = () => (dispatch) => {
//   localStorage.clear();
//   dispatch({ type: LOGOUT });
// };

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
  toastSuccess("Logged out successfully 👋");
};
