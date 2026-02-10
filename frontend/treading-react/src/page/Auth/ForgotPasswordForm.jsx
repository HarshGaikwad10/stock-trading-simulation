import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  sendForgotPasswordOtp,
  resetPassword,
} from "@/state/Auth/Action";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const [step, setStep] = useState(1);

  /* ---------------- STEP 1: EMAIL ---------------- */

  const emailSchema = z.object({
    email: z.string().email("Enter a valid email"),
  });

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmitEmail = (data) => {
    dispatch(sendForgotPasswordOtp({ email: data.email }));
    setStep(2);
  };

  /* ---------------- STEP 2: OTP + PASSWORD ---------------- */

  const resetSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      otp: "",
      password: "",
    },
  });

  const onSubmitReset = (data) => {
    dispatch(
      resetPassword({
        sessionId: auth.resetSession,
        otp: data.otp,
        password: data.password,
        navigate,
      })
    );
  };

  return (
    <div className="relative bg-black/30 backdrop-blur-xl text-white rounded-xl p-6 w-full max-w-sm mx-auto border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>

      <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
        <X size={18} />
      </button>

      {/* -------- STEP 1 UI -------- */}
      {step === 1 && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onSubmitEmail)}
            className="space-y-6"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className="bg-transparent border border-white/30 text-white h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full">
              Send OTP
            </Button>
          </form>
        </Form>
      )}

      {/* -------- STEP 2 UI -------- */}
      {step === 2 && (
        <Form {...resetForm}>
          <form
            onSubmit={resetForm.handleSubmit(onSubmitReset)}
            className="space-y-6"
          >
            <FormField
              control={resetForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    OTP
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter 6 digit OTP"
                      className="bg-transparent border border-white/30 text-white h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={resetForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="New password"
                      className="bg-transparent border border-white/30 text-white h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full bg-white text-black hover:bg-gray-200">
              Reset Password
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
