// import React, { useEffect, useState } from 'react'
// import { Input } from '@/components/ui/input'
// import { DotIcon } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { useDispatch, useSelector } from 'react-redux'
// import { getUserWallet } from '@/state/Wallet/Action'
// import { getAssetDetails } from '@/state/Asset/Action'
// import { payOrder } from '@/state/Order/Action'
// import { toastError } from "@/utils/toast";

// const TreadingForm = () => {
//   const [amount, setAmount] = useState(0);
//   const [orderType, setOrderType] = useState("BUY");
//   const [quantity, setQuantity] = useState(0);
//   const { coin, asset } = useSelector(store => store);
//   const { wallet } = useSelector((store) => store);
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     console.log(wallet);
//     setAmount(e.target.value);
//     const volume = calculateBuyCost(amount, coin.coinDetails.market_data.current_price.usd);
//     setQuantity(volume);
//   }

//   const calculateBuyCost = (amount, price) => {
//     let volume = amount / price;
//     let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);

//     return volume.toFixed(decimalPlaces);
//   }

//   const handleBuyCrypto = () => {
//     dispatch(payOrder({
//       jwt: localStorage.getItem("jwt"),
//       amount,
//       orderData: {
//         coinId: coin.coinDetails?.id,
//         quantity,
//         orderType
//       }
//     }))
//   }

//   useEffect(() => {
//     if (!coin.coinDetails?.id) return;
//     console.log("coin details: ", coin.coinDetails);
//     dispatch(getUserWallet(localStorage.getItem("jwt")));

//     dispatch(getAssetDetails({
//       coinId: coin.coinDetails.id,
//       jwt: localStorage.getItem("jwt")
//     }));
//   }, [coin.coinDetails?.id, dispatch]);

//   return (
//     <div className="w-full flex justify-center items-start pt-6">
//       <div className="w-full max-w-sm rounded-xl bg-gradient-to-b from-[#050b1c] to-black p-5 text-white shadow-xl">

//         {/* TITLE */}
//         <h2 className="text-base font-semibold mb-5">
//           How Much Do you want to spend?
//         </h2>

//         {/* AMOUNT INPUT */}
//         <div className="space-y-4">
//           <div className="flex gap-3 items-center justify-between">
//             <Input
//               className="py-5 bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-0"
//               placeholder="Enter Amount..."
//               onChange={handleChange}
//               type="number"
//               name="amount"
//             />

//             <div>
//               <p className="border border-white/10 text-base flex justify-center items-center w-28 h-11 rounded-md bg-black/40">
//                 {quantity}
//               </p>
//             </div>
//           </div>

//           {false && (
//             <h2 className="text-red-600 text-center text-xs">
//               Insufficient Wallet Balance to Buy
//             </h2>
//           )}
//         </div>

//         {/* COIN INFO */}
//         <div className="mt-5">
//           <div className="flex items-center gap-3">
//             <img
//               src={coin.coinDetails?.image.small}
//               className="w-7 h-7"
//               alt="btc"
//             />

//             <div>
//               <div className="flex items-center gap-2 text-xs">
//                 <span className="font-semibold text-white">{coin.coinDetails?.symbol.toUpperCase()}</span>
//                 <DotIcon className="text-gray-500" />
//                 <span className="text-gray-400">{coin.coinDetails?.name}</span>
//               </div>

//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-base font-bold text-white">${coin.coinDetails?.market_data.current_price.usd}</span>
//                 <span className="text-red-500 text-xs">
//                    {coin.coinDetails?.market_data.market_cap_change_24h} {coin.coinDetails?.
//                     market_cap_change_percentage_24h}
//                 </span>
//                 <span className="text-white text-xs">
//                     {coin.coinDetails?.market_data.
//                     market_cap_change_percentage_24h}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ORDER DETAILS */}
//         <div className="mt-5 space-y-3 text-sm text-gray-300">
//           <div className="flex justify-between">
//             <p>Order Type</p>
//             <p>Market Order</p>
//           </div>

//           <div className="flex justify-between">
//             <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
//             <p>{orderType === "BUY" ? "$" + wallet.userWallet?.balance : (asset.assetDetails?.quantity || 0)}</p>
//           </div>
//         </div>

//         {/* BUTTONS */}
//         <div className="mt-6 space-y-3">
//           <Button onClick={handleBuyCrypto}
//             className={`w-full py-5 text-sm font-semibold ${orderType === "SELL"
//               ? "bg-red-700 hover:bg-red-800"
//               : "bg-gray-300 text-black cursor-not-allowed"
//               }`}
//           >
//             {orderType.toUpperCase()}
//           </Button>

//           <Button
//             variant="ghost"
//             className="w-full text-sm underline text-gray-300 hover:text-white"
//             onClick={() =>
//               setOrderType(orderType === "BUY" ? "SELL" : "BUY")
//             }
//           >
//             {orderType === "BUY" ? "Or SELL" : "Or BUY"}
//           </Button>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default TreadingForm



import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "@/state/Wallet/Action";
import { getAssetDetails } from "@/state/Asset/Action";
import { payOrder } from "@/state/Order/Action";
import { toastError } from "@/utils/toast";

const TreadingForm = () => {
  const [amount, setAmount] = useState(0);
  const [orderType, setOrderType] = useState("BUY");
  const [quantity, setQuantity] = useState(0);

  const { coin, asset, wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  const calculateBuyCost = (amount, price) => {
    if (!price || !amount) return 0;
    let volume = amount / price;
    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);
    return Number(volume.toFixed(decimalPlaces));
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setAmount(value);

    const price = coin.coinDetails?.market_data?.current_price?.usd;
    const volume = calculateBuyCost(value, price);
    setQuantity(volume);
  };

  const handleBuyCrypto = () => {
    // ❌ BUY validation
    if (orderType === "BUY" && amount > wallet.userWallet?.balance) {
      toastError("❌ Insufficient wallet balance");
      return;
    }

    // ❌ SELL validation
    if (
      orderType === "SELL" &&
      quantity > (asset.assetDetails?.quantity || 0)
    ) {
      toastError("❌ Insufficient asset quantity");
      return;
    }

    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
      })
    );
  };

  useEffect(() => {
    if (!coin.coinDetails?.id) return;

    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(
      getAssetDetails({
        coinId: coin.coinDetails.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [coin.coinDetails?.id, dispatch]);

  return (
    <div className="w-full flex justify-center items-start pt-6">
      <div className="w-full max-w-sm rounded-xl bg-gradient-to-b from-[#050b1c] to-black p-5 text-white shadow-xl">

        <h2 className="text-base font-semibold mb-5">
          How Much Do you want to spend?
        </h2>

        <div className="space-y-4">
          <div className="flex gap-3 items-center justify-between">
            <Input
              className="py-5 bg-black/40 border border-white/10 text-white"
              placeholder="Enter Amount..."
              onChange={handleChange}
              type="number"
            />

            <p className="border border-white/10 text-base flex justify-center items-center w-28 h-11 rounded-md bg-black/40">
              {quantity}
            </p>
          </div>
        </div>

        {/* COIN INFO */}
        <div className="mt-5">
          <div className="flex items-center gap-3">
            <img
              src={coin.coinDetails?.image?.small}
              className="w-7 h-7"
              alt="coin"
            />

            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-white">
                  {coin.coinDetails?.symbol?.toUpperCase()}
                </span>
                <DotIcon className="text-gray-500" />
                <span className="text-gray-400">
                  {coin.coinDetails?.name}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-bold text-white">
                  $
                  {coin.coinDetails?.market_data?.current_price?.usd}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER DETAILS */}
        <div className="mt-5 space-y-3 text-sm text-gray-300">
          <div className="flex justify-between">
            <p>Order Type</p>
            <p>Market Order</p>
          </div>

          <div className="flex justify-between">
            <p>
              {orderType === "BUY"
                ? "Available Cash"
                : "Available Quantity"}
            </p>
            <p>
              {orderType === "BUY"
                ? "$" + wallet.userWallet?.balance
                : asset.assetDetails?.quantity || 0}
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 space-y-3">
          <Button
            onClick={handleBuyCrypto}
            className={`w-full py-5 text-sm font-semibold ${
              orderType === "SELL"
                ? "bg-red-700 hover:bg-red-800"
                : "bg-gray-300 text-black"
            }`}
          >
            {orderType}
          </Button>

          <Button
            variant="ghost"
            className="w-full text-sm underline text-gray-300"
            onClick={() =>
              setOrderType(orderType === "BUY" ? "SELL" : "BUY")
            }
          >
            {orderType === "BUY" ? "Or SELL" : "Or BUY"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TreadingForm;
