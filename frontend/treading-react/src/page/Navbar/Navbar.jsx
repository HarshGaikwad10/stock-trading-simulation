import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import Sidebar from "./Sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useSelector } from "react-redux"

function Navbar() {

  const {auth} = useSelector(store=>store);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="flex h-14 items-center px-4">

        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 hover:bg-accent rounded-md">
              <DragHandleHorizontalIcon />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0 bg-[#060b1a]">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <p className="ml-4">Stock Nova</p>

        <div className="ml-6">
          <button className="flex items-center gap-2 border px-3 py-1 rounded-md">
            <MagnifyingGlassIcon />
            Search
          </button>
        </div>

        <div className="ml-auto h-9 w-9 bg-slate-700 rounded-full flex items-center justify-center">
          <Avatar>
              <AvatarFallback>
                  {auth.user?.fullName[0].toUpperCase()}  
              </AvatarFallback>   
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default Navbar
