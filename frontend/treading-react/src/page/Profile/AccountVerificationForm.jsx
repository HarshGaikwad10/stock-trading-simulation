// import React, { useState } from 'react'

// import { Button } from '@/components/ui/button'
// import {
//     Dialog,
//     DialogTrigger,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogClose,
// } from '@/components/ui/dialog'

// import {
//     InputOTP,
//     InputOTPGroup,
//     InputOTPSlot,
// } from '@/components/ui/input-otp'

// const AccountVerificationForm = () => {
//     const [email, setEmail] = useState('codewithzosh@gmail.com')
//     const [otp, setOtp] = useState('')

//     const handleSendOtp = () => {
//         console.log('Send OTP to:', email)
//     }

//     const handleSubmit = () => {
//         console.log('OTP:', otp)
//     }

//     return (
//         <div className="w-full">

//             {/* VERIFY ACCOUNT */}
//             <div className="rounded-lg border border-white/10 bg-gradient-to-b from-[#060b1a] to-[#020617] p-6 space-y-6">

//                 <h2 className="text-lg font-semibold text-white">
//                     Verify your account
//                 </h2>

//                 {/* EMAIL ROW */}
//                 <div className="flex items-center gap-4">
//                     <p className="w-16 text-sm text-gray-300">
//                         Email :
//                     </p>

//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="flex-1 bg-transparent border border-white/10 rounded-md px-3 py-2 text-sm text-gray-200 outline-none focus:border-white/30"
//                     />

//                     <Dialog>
//                         <DialogTrigger asChild>
//                             <Button
//                                 onClick={handleSendOtp}
//                                 className="bg-white text-black hover:bg-gray-200"
//                             >
//                                 Send OTP
//                             </Button>
//                         </DialogTrigger>

//                         {/* OTP MODAL */}
//                         <DialogContent className="bg-gradient-to-b from-[#060b1a] to-[#020617] border border-white/10 text-white max-w-md">

//                             <DialogHeader>
//                                 <DialogTitle className="text-white">
//                                     Enter OTP
//                                 </DialogTitle>
//                             </DialogHeader>

//                             <div className="py-6 flex flex-col items-center gap-6">

//                                 {/* OTP INPUT */}
//                                 <InputOTP
//                                     value={otp}
//                                     onChange={(value) => setOtp(value)}
//                                     maxLength={6}
//                                 >
//                                     <InputOTPGroup className="flex gap-3">
//                                         {[0, 1, 2, 3, 4, 5].map((i) => (
//                                             <InputOTPSlot
//                                                 key={i}
//                                                 index={i}
//                                                 className="
//                           h-12 w-12
//                           rounded-md
//                           bg-[#020617]
//                           border border-white/20
//                           text-white
//                           text-lg
//                           text-center
//                           focus:border-white
//                           focus:ring-1
//                           focus:ring-white/30
//                         "
//                                             />
//                                         ))}
//                                     </InputOTPGroup>
//                                 </InputOTP>

//                                 {/* SUBMIT BUTTON */}
//                                 <DialogClose asChild>
//                                     <Button
//                                         onClick={handleSubmit}
//                                         className="w-full bg-white text-black hover:bg-gray-200"
//                                     >
//                                         Submit
//                                     </Button>
//                                 </DialogClose>

//                             </div>
//                         </DialogContent>
//                     </Dialog>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AccountVerificationForm


import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDispatch } from "react-redux";
import {
  sendTwoFactorOtp,
  verifyEnableTwoFactor,
} from "@/state/Auth/Action";

const AccountVerificationForm = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();

  // ⏱ OTP countdown
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = () => {
    dispatch(sendTwoFactorOtp({ verificationType: "EMAIL" }));
    setTimer(60);
  };

  const handleVerifyOtp = () => {
    dispatch(verifyEnableTwoFactor({ otp }));
  };

  return (
    <div className="space-y-6">

      <Button onClick={handleSendOtp} className="w-full">
        Send OTP
      </Button>

      <InputOTP value={otp} onChange={setOtp} maxLength={6}>
        <InputOTPGroup className="flex gap-3 justify-center">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} className="h-12 w-12" />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <Button
        onClick={handleVerifyOtp}
        className="w-full bg-white text-black"
      >
        Verify & Enable
      </Button>

      {/* RESEND */}
      {timer > 0 ? (
        <p className="text-center text-sm text-gray-400">
          Resend OTP in {timer}s
        </p>
      ) : (
        <button
          onClick={handleSendOtp}
          className="text-sm text-blue-400 underline text-center w-full"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default AccountVerificationForm;
