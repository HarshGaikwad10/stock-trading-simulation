import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./page/Navbar/Navbar";
import Home from "./page/Home/Home";
import Activity from "./page/Activity/Activity";
import Portfolio from "./page/Portfolio/Portfolio";
import Wallet from "./page/Wallet/Wallet";
import Withdrawal from "./page/Withdrawal/Withdrawal";
import PaymentDetails from "./page/PaymentDetails/PaymentDetails";
import StockDetails from "./page/StockDetails/StockDetails";
import Watchlist from "./page/Watchlist/Watchlist";
import Profile from "./page/Profile/Profile";
import SearchCoin from "./page/Search/SearchCoin";
import Notfound from "./page/Notfound/Notfound";
import Auth from "./page/Auth/Auth";

import { getUser } from "./state/Auth/Action";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const token = auth.jwt || localStorage.getItem("jwt");
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [auth.jwt, dispatch]);

  return (
    <>
      {isAuthenticated ? (
        <div className="pt-14">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchCoin />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}

      {/* 🔔 GLOBAL TOASTER */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;
