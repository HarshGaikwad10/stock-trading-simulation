import React from "react"
import { useForm } from "react-hook-form"
import { X } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog"
import { useDispatch } from "react-redux"
import { addPaymentDetails } from "@/state/Withdrawal/Action"

const PaymentDetailsForm = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: "",
    },
  })

  const onSubmit = (data) => {
    dispatch(addPaymentDetails({
      paymentDetails: data,
      jwt: localStorage.getItem("jwt")
    }));
    console.log(data)
  }

  return (
    <div className="bg-[#060b18] text-white rounded-xl p-8 w-full max-w-md mx-auto border border-slate-1000 relative">

      {/* Close Button */}
      <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-white">
        <X size={18} />
      </DialogClose>

      <h2 className="text-lg font-semibold mb-6">
        Payment Details
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="code with zosh"
                    className="bg-transparent border border-slate-700 text-white h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="code with zosh"
                    className="bg-transparent border border-slate-700 text-white h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="********5604"
                    className="bg-transparent border border-slate-700 text-white h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="confirm account number"
                    className="bg-transparent border border-slate-700 text-white h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Yes Bank"
                    className="bg-transparent border border-slate-700 text-white h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose className="w-full">
            <button
              type="submit"
              className="w-full py-4 text-lg font-medium rounded-md bg-gray-100 text-black hover:bg-gray-200 transition"
            >
              Submit
            </button>
          </DialogClose>

        </form>
      </Form>
    </div>
  )
}

export default PaymentDetailsForm
