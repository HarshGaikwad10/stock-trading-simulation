import React, { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useNavigate, useParams } from "react-router-dom"
import { ScrollArea } from "@radix-ui/react-scroll-area"

const AssetTable = ({ coin,category }) => {
  const navigate = useNavigate()

  return (
    <TooltipProvider>
      <Table className="table-fixed w-full">
        <ScrollArea className={`${category=="all" ? "h-[74vh]" : "h-[82vh]"}`}>
          {/* TABLE HEADER */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[220px]">Coin</TableHead>
              <TableHead className="w-[90px]">Symbol</TableHead>
              <TableHead className="w-[130px]">Volume</TableHead>
              <TableHead className="w-[150px]">Market Cap</TableHead>
              <TableHead className="w-[80px]">24H</TableHead>
              <TableHead className="w-[120px] text-right">Price</TableHead>
            </TableRow>
          </TableHeader>

          {/* TABLE BODY */}
          <TableBody>
            {coin?.map((item) => (
              <TableRow key={item.id}>

                {/* COIN */}
                <TableCell
                  onClick={() => navigate(`/market/${item.id}`)}
                  className="font-medium flex items-center gap-2 max-w-[220px] cursor-pointer"
                >
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarImage src={item.image} />
                  </Avatar>

                  {/* TOOLTIP FOR FULL NAME */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="truncate whitespace-nowrap overflow-hidden">
                        {item.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>

                {/* SYMBOL */}
                <TableCell className="uppercase whitespace-nowrap">
                  {item.symbol}
                </TableCell>

                {/* VOLUME */}
                <TableCell className="whitespace-nowrap">
                  {item.total_volume.toLocaleString()}
                </TableCell>

                {/* MARKET CAP */}
                <TableCell className="whitespace-nowrap">
                  {item.market_cap.toLocaleString()}
                </TableCell>

                {/* 24H CHANGE */}
                <TableCell
                  className={`whitespace-nowrap ${item.price_change_percentage_24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                    }`}
                >
                  {item.price_change_percentage_24h}%
                </TableCell>

                {/* PRICE */}
                <TableCell className="text-right whitespace-nowrap">
                  ${item.current_price.toLocaleString()}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </ScrollArea>


      </Table>
    </TooltipProvider>
  )
}

export default AssetTable;

