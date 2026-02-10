import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "@/state/Order/Action";
import { useEffect } from "react";
import { calculateProfit } from "@/utils/calculateProfit";

const Activity = () => {
  const dispatch = useDispatch();
  const { order } = useSelector(store => store);

  useEffect(() => {

    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));

  }, [dispatch]);
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Activity</h1>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Date & Time</TableHead>
            <TableHead>Trading Pair</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Sell Price</TableHead>
            <TableHead>Order Type</TableHead>
            <TableHead className="text-center">Profit/Loss</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {order.orders.map((item, index) => (
            <TableRow key={index}>

              {/* Date */}
              <TableCell>
                <p>
                  {new Date(item.timeStamp)
                    .toLocaleDateString("en-CA")
                    .replaceAll("-", "/")}
                </p>
                <p className="text-gray-400">
                  {new Date(item.timeStamp).toLocaleTimeString("en-GB")}
                </p>
              </TableCell>

              {/* Coin */}
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={item.orderItem.coin.image} />
                </Avatar>
                <span>{item.orderItem.coin.name}</span>
              </TableCell>

              {/* Buy */}
              <TableCell>{item.orderItem.buyPrice}</TableCell>

              {/* Sell */}
              <TableCell>{item.orderItem.sellPrice}</TableCell>

              {/* Order */}
              <TableCell className="text-green-400">{item.orderType}</TableCell>

              {/* Profit/Loss */}
              <TableCell className="text-center text-green-400">
                {calculateProfit(item)}
              </TableCell>

              {/* Value */}
              <TableCell className="text-right">${item.price}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
