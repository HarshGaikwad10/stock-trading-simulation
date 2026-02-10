import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PaymentDetailsForm from "./PaymentDetailsForm"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPaymentDetails } from "@/state/Withdrawal/Action"


const PaymentDetails = () => {
  const {withdrawal} = useSelector(store=>store);
  const dispatch = useDispatch();
  
  useEffect(()=>{
      dispatch(getPaymentDetails({jwt:localStorage.getItem("jwt")}));
  },[]);

  return (
    <div className="px-20">

      <h1 className="text-3xl font-bold py-10 text-white">
        Payment Details
      </h1>

  { withdrawal.paymentDetails ?   <Card className="bg-slate-900 border border-slate-800 text-slate-200 rounded-xl">

        <CardHeader>
          <CardTitle className="text-white text-lg">
            Yes Bank
          </CardTitle>
          <CardDescription className="text-slate-400">
            A/C No : {withdrawal.paymentDetails?.accountNumber}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">

          <div className="flex items-center">
            <p className="w-32 text-slate-400">A/C Holder</p>
            <p className="text-slate-200">: {withdrawal.paymentDetails?.accountHolderName}</p>
          </div>

          <div className="flex items-center">
            <p className="w-32 text-slate-400">IFSC</p>
            <p className="text-slate-200">: {withdrawal.paymentDetails?.bankName}</p>
          </div>

        </CardContent>

      </Card> : <Dialog>
        <DialogTrigger>
          <Button className="py-6">Add Payment Details</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
           
            
          </DialogHeader>
          <PaymentDetailsForm />
        </DialogContent>
      </Dialog>}

      

    </div>
  )
}

export default PaymentDetails
