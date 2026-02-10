import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDispatch } from "react-redux";
import { verifyLoginOtp } from "@/state/Auth/Action";
import { useNavigate } from "react-router-dom";

const LoginOtpForm = ({ sessionId }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ⏱ countdown
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = () => {
    dispatch(
      verifyLoginOtp({
        otp,
        sessionId,
        navigate,
      })
    );
  };

  return (
    <div className="space-y-6 mt-6">

      <p className="text-gray-300 text-sm text-center">
        Enter the OTP sent to your email
      </p>

      <InputOTP value={otp} onChange={setOtp} maxLength={6}>
        <InputOTPGroup className="flex gap-3 justify-center">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="h-12 w-12 text-white"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <Button
        onClick={handleVerifyOtp}
        className="w-full bg-white text-black"
      >
        Verify OTP & Login
      </Button>

      {timer > 0 ? (
        <p className="text-center text-sm text-gray-400">
          OTP expires in {timer}s
        </p>
      ) : (
        <p className="text-center text-sm text-red-400">
          OTP expired. Please login again.
        </p>
      )}
    </div>
  );
};

export default LoginOtpForm;
