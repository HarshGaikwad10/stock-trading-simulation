import React, { useEffect, useState } from "react"
import { BookmarkFilledIcon } from "@radix-ui/react-icons"
import { BookmarkIcon, DotIcon } from "lucide-react"
import TreadingForm from "./TreadingForm"
import StockChart from "../Home/StockChart"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCoinDetails } from "@/state/Coin/Action"
import { addItemToWatchlist, getUserWatchlist } from "@/state/Watchlist/Action"
import { existInWatchlist } from "@/utils/existInWatchlist"


const StockDetails = () => {
  const [saved, setSaved] = useState(false)
  const { coin, watchlist } = useSelector((store) => store);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCoinDetails({ coinId: id, jwt: localStorage.getItem("jwt") }));
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [id]);

  const handleAddToWatchlist = () => {
    dispatch(addItemToWatchlist({ coinId: coin.coinDetails?.id, jwt: localStorage.getItem("jwt") }));
  }

  return (
    <div className="w-full bg-gradient-to-b from-[#050b1c] to-black px-6 py-4">

      <div className="flex justify-between items-center">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          <img
            src={coin.coinDetails?.image?.large}
            className="w-9 h-9"
            alt="btc"
          />

          <div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-white">{coin.coinDetails?.symbol?.toUpperCase()}
              </span>
              <DotIcon className="text-gray-500" />
              <span className="text-gray-400">{coin.coinDetails?.name}</span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold text-white">
                ${coin.coinDetails?.market_data?.current_price?.usd}
              </span>

              <span className="text-red-500 text-sm">
                {coin.coinDetails?.market_data?.market_cap_change_24h}%
              </span>

              <span>
                ({coin.coinDetails?.market_data?.market_cap_change_percentage_24h}%)
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">

          {/* Bookmark */}
          <button
            onClick={handleAddToWatchlist}
            className="h-11 w-11 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition"
          >
            {existInWatchlist(watchlist.items, coin.coinDetails) ? (
              <BookmarkFilledIcon className="h-6 w-6 text-white" />
            ) : (
              <BookmarkIcon className="h-6 w-6 text-white" />
            )}
          </button>

          {/* Trade Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-11 px-6 text-sm font-medium">
                Trade
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>How much do you want to spend?</DialogTitle>
              </DialogHeader>

              <TreadingForm />
            </DialogContent>
          </Dialog>

        </div>
      </div>

      <div className="mt-14">
        <StockChart coinId={id} />
      </div>


    </div>
  )
}

export default StockDetails
