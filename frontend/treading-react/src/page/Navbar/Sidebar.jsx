import { SheetClose } from "@/components/ui/sheet"
import { logout } from "@/state/Auth/Action"
import {
  Home,
  LayoutGrid,
  Bookmark,
  Activity,
  Wallet,
  CreditCard,
  Landmark,
  User,
  LogOut,
} from "lucide-react"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"

const menu = [
  { id: "home", name: "Home", icon: <Home size={20} />, path: "/" },
  { id: "portfolio", name: "Portfolio", icon: <LayoutGrid size={20} />, path: "/portfolio" },
  { id: "watchlist", name: "Watchlist", icon: <Bookmark size={20} />, path: "/watchlist" },
  { id: "activity", name: "Activity", icon: <Activity size={20} />, path: "/activity" },
  { id: "wallet", name: "Wallet", icon: <Wallet size={20} />, path: "/wallet" },
  { id: "payment", name: "Payment Details", icon: <CreditCard size={20} />, path: "/payment-details" },
  { id: "withdrawal", name: "Withdrawal", icon: <Landmark size={20} />, path: "/withdrawal" },
  { id: "profile", name: "Profile", icon: <User size={20} />, path: "/profile" },
  { id: "logout", name: "Logout", icon: <LogOut size={20} />, path: "/" },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleItemClick = (item) => {
    if (item.name === "Logout") {
      handleLogout();
      navigate("/");
      return;
    }
    navigate(item.path);
  }

  return (
    <div className="h-full bg-gradient-to-b from-[#060b1a] to-[#020617] px-5 py-6 text-white">
      <div className="flex items-center gap-3 mb-10">
        <img
          src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png"
          className="h-8 w-8"
        />
        <h1 className="text-xl font-semibold">
          <span className="text-orange-500">Stock</span> Nova
        </h1>
      </div>

      <div className="space-y-3">
        {menu.map((item) => (
          <SheetClose key={item.id} asChild>
            <div onClick={() => handleItemClick(item)}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer border
              ${location.pathname === item.path
                  ? "bg-white/10 border-white/20"
                  : "border-white/10 hover:bg-white/5"
                }`}
            >
              {item.icon}
              {item.name}
            </div>
          </SheetClose>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
