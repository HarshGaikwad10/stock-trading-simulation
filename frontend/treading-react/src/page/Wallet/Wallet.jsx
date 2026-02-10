import React, { useEffect } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import {
  CopyIcon,
  DollarSign,
  ShuffleIcon,
  UploadIcon,
  DownloadIcon,
  WalletIcon
} from 'lucide-react'

import TopupForm from './TopupForm'
import WithdrawalForm from './WithdrawalForm'
import TransferForm from './TransferForm'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@/components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { depositMoney, getUserWallet, getWalletTransactions } from '@/state/Wallet/Action'
import { useLocation, useNavigate } from 'react-router-dom'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {

  const dispatch = useDispatch();
  const {wallet} = useSelector((store)=>store);
  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const navigate = useNavigate();

  const handleFetchUserWallet = () => {
      dispatch(getUserWallet(localStorage.getItem("jwt")));  
  }
  
  const handleFetchWalletTransaction = () => {
      dispatch(getWalletTransactions({jwt:localStorage.getItem("jwt")}));  
  }

  useEffect(()=>{
    handleFetchUserWallet();
    handleFetchWalletTransaction();
  },[]);

  useEffect(()=>{
      if(orderId){
        dispatch(depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId:razorpayPaymentId || paymentId,
          navigate
        })
        )
      }
  },[orderId, paymentId, razorpayPaymentId]);

  return (
    <div className="flex flex-col items-center">

      <div className="pt-10 w-full lg:w-[50%]">
        <Card className="bg-slate-900 text-slate-100 border border-slate-800">

          {/* HEADER */}
          <CardHeader className="pb-5">
            <div className="flex justify-between items-center">

              <div className="flex items-center gap-5">
                <WalletIcon size={30} className="text-blue-400" />

                <div>
                  <CardTitle className="text-2xl text-blue-300">
                    My Wallet
                  </CardTitle>

                  <div className="flex items-center gap-2">
                    <p className="text-slate-400 text-sm">#{wallet.userWallet?.id}</p>
                    <CopyIcon
                      size={22}
                      className="cursor-pointer text-slate-400 hover:text-blue-400"
                    />
                  </div>
                </div>
              </div>

              <ReloadIcon onClick={handleFetchUserWallet} className="w-6 h-6 cursor-pointer text-slate-400 hover:text-blue-400" />
            </div>
          </CardHeader>

          {/* CONTENT */}
          <CardContent>

            <div className="flex items-center text-blue-300">
              <DollarSign />
              <span className="text-2xl font-semibold">{wallet.userWallet.balance}</span>
            </div>

            <div className="flex gap-7 mt-5">

              {/* ADD MONEY */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 cursor-pointer flex flex-col items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 transition shadow-md">
                    <UploadIcon className="text-blue-400" />
                    <span className="text-sm mt-2 text-slate-300">
                      Add Money
                    </span>
                  </div>
                </DialogTrigger>

                <DialogContent className="bg-slate-900 border border-slate-800 text-slate-100">
                  <DialogHeader>
                    <DialogTitle className="text-blue-300">
                      Top Up Your Wallet
                    </DialogTitle>
                  </DialogHeader>

                  <TopupForm />
                </DialogContent>
              </Dialog>

              {/* WITHDRAW */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 cursor-pointer flex flex-col items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 transition shadow-md">
                    <DownloadIcon className="text-red-400" />
                    <span className="text-sm mt-2 text-slate-300">
                      Withdrawal
                    </span>
                  </div>
                </DialogTrigger>

                <DialogContent className="bg-slate-900 border border-slate-800 text-slate-100">
                  <DialogHeader>
                    <DialogTitle className="text-blue-300">
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>

                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              {/* TRANSFER */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 cursor-pointer flex flex-col items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 transition shadow-md">
                    <ShuffleIcon className="text-blue-400" />
                    <span className="text-sm mt-2 text-slate-300">
                      Transfer
                    </span>
                  </div>
                </DialogTrigger>

                <DialogContent className="bg-slate-900 border border-slate-800 text-slate-100">
                  <DialogHeader>
                    <DialogTitle className="text-blue-300">
                      Transfer To Other Wallet
                    </DialogTitle>
                  </DialogHeader>

                  <TransferForm />
                </DialogContent>
              </Dialog>

            </div>
          </CardContent>

        </Card>

        {/* HISTORY */}
        <div className="py-5 pt-10">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-2xl font-semibold">History</h1>
            <UpdateIcon onClick={handleFetchWalletTransaction} className="h-7 w-7 cursor-pointer hover:text-gray-400" />
          </div>
        </div>

        <div className="space-y-5">

          {wallet.transactions.map((item, i) => (
            <div key={i}>
              <Card className="lg-w-[50%] px-5 flex justify-between item-center border border-slate-700 rounded-md">
                <div className="flex items-center gap-5">
                  <Avatar>
                    <AvatarFallback>
                      <ShuffleIcon />
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h1>{item.type || item.purpose}</h1>
                    <p className="text-sm text-gray-200">{item.date}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <p className="text-green-500">${item.amount} USD</p>
                </div>
              </Card>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Wallet
