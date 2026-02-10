import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { X } from "lucide-react"
import LoginOtpForm from "./LoginOtpForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux"
import { login } from "@/state/Auth/Action"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [twoFactorSession, setTwoFactorSession] = useState(null);

  const signinSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const onSubmit = (data) => {
    dispatch(login({ data, navigate, setTwoFactorSession }));
    console.log(data);
  }

  return (

    <div className="relative bg-black/30 backdrop-blur-xl text-white rounded-xl p-6 w-full max-w-sm mx-auto border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
      <h1 className="text-x1 font-bold">Login To Your Account</h1>
      <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
        <X size={18} />
      </button>
      {twoFactorSession ? (
        <LoginOtpForm sessionId={twoFactorSession} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Email Address"
                      className="bg-transparent border border-white/30 text-white h-11 placeholder:text-gray-400 focus:border-white focus:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      className="bg-transparent border border-white/30 text-white h-11 placeholder:text-gray-400 focus:border-white focus:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full mt-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>

          </form>
        </Form>
      )}
    </div>
  )
}

export default SigninForm
