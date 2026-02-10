// import api from "@/config/api";
// import {
//     GET_ALL_ORDERS_FAILURE,
//     GET_ALL_ORDERS_REQUEST,
//     GET_ALL_ORDERS_SUCCESS,
//     GET_ORDER_FAILURE,
//     GET_ORDER_REQUEST,
//   GET_ORDER_SUCCESS,
//   PAY_ORDER_FAILURE,
//   PAY_ORDER_REQUEST,
//   PAY_ORDER_SUCCESS,
// } from "./ActionTypes";


// export const payOrder =
//   ({ jwt, orderData, amount }) =>
//   async (dispatch) => {
//     dispatch({ type: PAY_ORDER_REQUEST });

//     try {
//       const response = await api.post("/api/orders/pay", orderData, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });

//       dispatch({
//         type: PAY_ORDER_SUCCESS,
//         payload: response.data,
//         amount,
//       });

//       console.log("order success", response.data);
//     } catch (error) {
//       console.log("error", error);
//       dispatch({
//         type: PAY_ORDER_FAILURE,
//         error: error.message,
//       });
//     }
//   };



// export const getAllOrdersForUser = ({jwt,orderType,assetSymbol}) => async(dispatch) =>{

//     dispatch({type: GET_ALL_ORDERS_REQUEST});

//     try {
        
//         const response = await api.get('/api/orders',{
//             headers: {
//                 Authorization: `Bearer ${jwt}`
//             },
//             params: {
//                 order_type: orderType,
//                 asset_Symbol: assetSymbol,
//             },
//         });
        
//         dispatch({
//             type: GET_ALL_ORDERS_SUCCESS,
//             payload: response.data,
//         });
//         console.log("order success",response.data);
//     } catch (error) {
//         console.log("error",error);
//         dispatch({
//             type: GET_ALL_ORDERS_FAILURE,
//             error: error.message
//         })
//     }

// }

import api from "@/config/api";
import {
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  PAY_ORDER_FAILURE,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
} from "./ActionTypes";

import { toastSuccess, toastError, toastInfo } from "@/utils/toast";

/* ===========================
   PAY ORDER (BUY / SELL)
=========================== */

export const payOrder =
  ({ jwt, orderData, amount }) =>
  async (dispatch) => {
    dispatch({ type: PAY_ORDER_REQUEST });

    // ⏳ loading toast
    toastInfo("Processing order ⏳");

    try {
      const response = await api.post(
        "/api/orders/pay",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: PAY_ORDER_SUCCESS,
        payload: response.data,
        amount,
      });

      // ✅ success toast
      if (orderData.orderType === "BUY") {
        toastSuccess("✅ Stock bought successfully");
      } else {
        toastSuccess("✅ Stock sold successfully");
      }

      console.log("order success", response.data);

    } catch (error) {
      console.log("error", error);

      dispatch({
        type: PAY_ORDER_FAILURE,
        error: error.message,
      });

      const status = error.response?.status;

      // ❌ error toasts
      if (status === 400) {
        toastError("❌ Insufficient wallet balance");
      } else if (status === 409) {
        toastError("❌ Insufficient quantity to sell");
      } else {
        toastError("❌ Order failed, please try again");
      }
    }
  };

/* ===========================
   GET ALL ORDERS
=========================== */

export const getAllOrdersForUser =
  ({ jwt, orderType, assetSymbol }) =>
  async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });

    try {
      const response = await api.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          order_type: orderType,
          asset_Symbol: assetSymbol,
        },
      });

      dispatch({
        type: GET_ALL_ORDERS_SUCCESS,
        payload: response.data,
      });

      console.log("order success", response.data);
    } catch (error) {
      console.log("error", error);

      dispatch({
        type: GET_ALL_ORDERS_FAILURE,
        error: error.message,
      });

      toastError("Failed to fetch orders");
    }
  };
