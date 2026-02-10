
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { X, Eye, EyeOff, Calendar } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { register } from "@/state/Auth/Action"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const dobRef = useRef(null);

  const signupSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),

    dateOfBirth: z
      .string()
      .refine((value) => {
        const dob = new Date(value)
        const today = new Date()
        const age = today.getFullYear() - dob.getFullYear()
        const m = today.getMonth() - dob.getMonth()
        return age > 15 || (age === 15 && m >= 0)
      }, "You must be at least 15 years old"),

    nationality: z.string().min(1, "Nationality is required"),
    address: z.string().min(3, "Address is required"),
    city: z.string().min(2, "City is required"),
    postcode: z.string().regex(/^\d{4,6}$/, "Invalid postal code"),
    country: z.string().min(2, "Country is required"),
  })

 const form = useForm({
  resolver: zodResolver(signupSchema),
  defaultValues: {
    fullName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  },
})

  const onSubmit = (data) => {
    dispatch(register({ data, navigate }));
    console.log(data)
  }

  return (
    <div className="relative bg-black/30 backdrop-blur-xl text-white rounded-xl p-8 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)]">

      <h1 className="text-xl font-bold mb-4">Create Your Account</h1>

      <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
        <X size={18} />
      </button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5" >

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Full Name"
                    className="bg-transparent border border-white/30 text-white h-11 placeholder:text-gray-400 focus:border-white focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="bg-transparent border border-white/30 text-white h-11 placeholder:text-gray-400 focus:border-white focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password with Eye Toggle */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="bg-transparent border border-white/30 text-white h-11 pr-10 placeholder:text-gray-400 focus:border-white focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-gray-300">Date of Birth</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      ref={dobRef}
                      type="date"
                      className="bg-transparent border border-white/30 text-white h-11 pr-10 focus:border-white focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => dobRef.current?.showPicker?.()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <Calendar size={18} />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          {/* Nationality */}
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Nationality</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Indian"
                    className="bg-transparent border border-white/30 text-white h-11 placeholder:text-gray-400 focus:border-white focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Street / Area"
                    className="bg-transparent border border-white/30 text-white h-11 placeholder:text-gray-400 focus:border-white focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="City"
                    className="bg-transparent border border-white/30 text-white h-11 placeholder:text-gray-400 focus:border-white focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postcode */}
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Postcode</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Postal Code"
                    className="bg-transparent border border-white/30 text-white h-11 placeholder:text-gray-400 focus:border-white focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="India"
                    className="bg-transparent border border-white/30 text-white h-11 placeholder:text-gray-400 focus:border-white focus:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="md:col-span-2 w-full mt-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Sign Up
          </button>

        </form>
      </Form>
    </div>
  )
}

export default SignupForm



