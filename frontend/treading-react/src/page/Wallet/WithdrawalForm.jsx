import React, { useState } from 'react'
import { Inbox } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogClose } from '@radix-ui/react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { withdrawalRequest } from '@/state/Withdrawal/Action'

const WithdrawalForm = () => {

  const [amount, setAmount] = useState('')
  const dispatch = useDispatch();
  const {wallet,withdrawal} = useSelector((store)=>store);
  
  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handleSubmit = () => {
    dispatch(withdrawalRequest({amount,jwt:localStorage.getItem("jwt")}));
    console.log(amount);
  };

  return (
    <div className='pt-10 space-y-5'>

      <div className='flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4'>
        <p>Available Balance</p>
        <p>$9000</p>
      </div>

      <div className='flex flex-col items-center'>
        <h1>Enter Withdrawal amount</h1>

        <div className='flex items-center justify-center'>
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawalInput py-7 border-none outline-none px-0 text-2xl text-center"
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>

      <div>
        <p className='pb-2'>Transfer To</p>
        <div className='flex items-center gap-5 border px-5 py-2 rounded-md'>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2830/2830284.png"
            className="h-8 w-8 "
            alt="Bank"
          />

          <div>
            <p className='text-xl font-bold'>{withdrawal.paymentDetails?.bankName}</p>
            <p className='text-xs'>{withdrawal.paymentDetails?.accountNumber}</p>
          </div>
        </div>
      </div>
      <DialogClose className="w-full">
  <button
    onClick={handleSubmit}
    className="w-full py-4 text-lg font-medium rounded-md bg-gray-100 text-black hover:bg-gray-200 transition"
  >
    Withdraw
  </button>
</DialogClose>

      

    </div>
  )
}

export default WithdrawalForm
