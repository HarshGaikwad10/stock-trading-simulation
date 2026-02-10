import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'
import { useDispatch } from 'react-redux'
import { paymentHandler } from '@/state/Wallet/Action'

const TopupForm = () => {

  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY')
  const dispatch = useDispatch(); 
  
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  }

  const handleChange = (e) => {
    setAmount(e.target.value);
  }

  const handleSubmit = () => {
    console.log(amount, paymentMethod);
    dispatch(paymentHandler({
      jwt: localStorage.getItem("jwt"),
      amount,
      paymentMethod
    }));
  }

  return (
    <div className="pt-8 space-y-6 text-white">

      {/* AMOUNT */}
      <div>
        <h1 className="pb-2 text-sm text-gray-300">Enter Amount</h1>
        <Input
          value={amount}
          onChange={handleChange}
          className="py-6 text-lg bg-transparent border border-slate-700 text-white"
          placeholder="$9999"
        />
      </div>

      {/* PAYMENT METHOD */}
      <div>
        <h1 className="pb-2 text-sm text-gray-300">
          Select payment method
        </h1>

        <RadioGroup
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
          className="flex gap-4"
        >

          {/* RAZORPAY */}
          <label className="flex items-center gap-3 border border-slate-700 rounded-lg px-4 py-3 cursor-pointer w-1/2">
            <RadioGroupItem
              value="RAZORPAY"
              className="h-5 w-5 rounded-full border border-slate-400 flex items-center justify-center"
            >
              {paymentMethod === 'RAZORPAY' && (
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              )}
            </RadioGroupItem>

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png"
              alt="Razorpay"
              className="h-6"
            />
          </label>

          {/* STRIPE */}
          <label className="flex items-center gap-3 border border-slate-700 rounded-lg px-4 py-3 cursor-pointer w-1/2">
            <RadioGroupItem
              value="STRIPE"
              className="h-5 w-5 rounded-full border border-slate-400 flex items-center justify-center"
            >
              {paymentMethod === 'STRIPE' && (
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              )}
            </RadioGroupItem>

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
              alt="Stripe"
              className="h-6"
            />
          </label>

        </RadioGroup>
      </div>

      {/* SUBMIT */}
      <DialogClose className="w-full">
        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black py-3 rounded-md font-medium hover:bg-gray-200 transition"
        >
          Submit
        </button>
      </DialogClose>

    </div>
  )
}

export default TopupForm

