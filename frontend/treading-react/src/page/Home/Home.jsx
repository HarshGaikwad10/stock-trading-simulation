import React, { useEffect, useState } from "react"
import AssetTable from "./AssetTable"
import StockChart from "./StockChart"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DotIcon, MessageCircle, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getCoinList, getTop50CoinList } from "@/state/Coin/Action"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useLocation } from "react-router-dom";


const Home = () => {
  const [category, setCategory] = useState("all")
  const [openChat, setOpenChat] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [page, setPage] = useState(1);

  const { auth, coin } = useSelector((store) => store);
  const jwt = auth.jwt || localStorage.getItem("jwt");
  const location = useLocation();

  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi 👋 You can ask crypto related questions like price, market cap etc...",
    },
  ])

  const buttonClass = (value) =>
    `rounded-full px-4 py-2 border transition-all
     ${category === value
      ? "bg-white text-black border-white"
      : "bg-transparent text-white border-white/20 hover:bg-white/10"
    }`

  useEffect(() => {
    setPage(1);
  }, [category]);

  const handleSend = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: inputValue },
      ])
      setInputValue("")
    }
  }

  useEffect(() => {
    if (!auth.user) return;

    if (!jwt) return;

    if (category === "top50") {
      dispatch(getTop50CoinList(jwt));
    } else {
      dispatch(getCoinList(page, jwt));
    }
  }, [category, page, jwt, location.pathname]);

  //GLOBAL LOADER FOR HOME
  if (!jwt || coin.loading) {
    return (
      <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-white">
          <div className="h-10 w-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">

      {/* MAIN LAYOUT */}
      <div className="lg:flex">

        {/* LEFT SIDE */}
        <div className="w-1/2 border-r border-white/10 p-6 h-[calc(100vh-3.5rem)] overflow-hidden">
          <div className="flex gap-3 flex-wrap mb-6">
            <button onClick={() => setCategory("all")} className={buttonClass("all")}>All</button>
            <button onClick={() => setCategory("top50")} className={buttonClass("top50")}>Top 50</button>
            <button onClick={() => setCategory("topGainers")} className={buttonClass("topGainers")}>Top Gainers</button>
            <button onClick={() => setCategory("topLosers")} className={buttonClass("topLosers")}>Top Losers</button>
          </div>
          <div className="h-full overflow-y-auto pr-2">
            <AssetTable coin={category == "all" ? coin.coinList : coin.top50} category={category} />
            {category === "all" && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>

                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => page > 1 && setPage(page - 1)}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink isActive>{page}</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext onClick={() => setPage(page + 1)} />
                    </PaginationItem>

                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 p-6 flex flex-col">
          <StockChart coinId={"bitcoin"} />

          {/* CRYPTO INFO */}
          <div className="mt-6 flex gap-5 items-center">
            <Avatar>
              <AvatarImage src="https://cdn-icons-png.flaticon.com/128/15301/15301597.png" />
            </Avatar>

            <div className="flex items-center gap-2">
              <p>ETH</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">Ethereum</p>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">5464</p>
              <p className="text-red-600">(-0.29%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT BUTTON */}
      <div className="absolute bottom-5 right-5 z-40">
        <button
          onClick={() => setOpenChat(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md shadow hover:bg-gray-200"
        >
          <MessageCircle size={20} />
          Chat Bot
        </button>
      </div>

      {/* CHAT BOX */}
      {openChat && (
        <div className="absolute bottom-20 right-5 z-50 w-[22rem] h-[75vh] bg-slate-900 rounded-md shadow-xl flex flex-col">

          {/* HEADER */}
          <div className="flex justify-between items-center px-5 h-[12%] border-b">
            <p className="font-semibold">Chat Bot</p>
            <button onClick={() => setOpenChat(false)}>
              <X />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-md max-w-[80%]
                  ${msg.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-gray-200"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="border-t px-4 h-[12%] flex items-center">
            <input
              type="text"
              placeholder="Write a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSend}
              className="w-full bg-transparent outline-none text-white"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
