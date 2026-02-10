import React, { useEffect } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux'
import { getUserAssets } from '@/state/Asset/Action'

const Portfolio = () => {

  const dispatch = useDispatch();
  const {asset} = useSelector(store=>store);

  useEffect(()=>{
    dispatch(getUserAssets(localStorage.getItem("jwt")))
  },[]);

  return (
    <div className='p-5 lg:px-20'>
      <h1 className='font-bold text-3xl pb-5'>Portfolio</h1>
      <Table>

        {/* TABLE HEADER */}
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Change</TableHead>
            <TableHead >Change(%)</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>

        {/* TABLE BODY */}
        <TableBody>
          {asset.userAssets.map((item, index) => (
            <TableRow key={index}>

              {/* COIN */}
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src={item.coin.image}
                  />
                </Avatar>
                <span>{item.coin.name}</span>
              </TableCell>

              {/* SYMBOL */}
              <TableCell>{item.coin.symbol.toUpperCase()}</TableCell>

              {/* VOLUME */}
              <TableCell>{item.quantity}</TableCell>

              {/* MARKET CAP */}
              <TableCell>{item.coin.price_change_24h}</TableCell>

              {/* 24H */}
              <TableCell className="text-green-400">{item.coin.price_change_percentage_24h}</TableCell>

              {/* PRICE */}
              <TableCell >{item.coin.total_volume}</TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  )
}

export default Portfolio
