import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { CheckCircle } from 'lucide-react'
import AccountVerificationForm from './AccountVerificationForm'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { auth } = useSelector(store => store);
  const isTwoFactorEnabled = auth.user?.twoFactorAuth?.enabled;


  const handleEnableTwoStepVerification = () => {
    console.log("two step verification")
  }

  return (
    <div className="flex flex-col items-center pt-10 px-4 space-y-6">

      {/* PROFILE INFO CARD */}
      <Card className="w-full max-w-5xl border border-white/10 bg-transparent rounded-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-lg">
            Your Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <div className="flex">
                <p className="w-32 text-sm text-gray-300">Email :</p>
                <p className="text-sm text-gray-400">{auth.user?.email}</p>
              </div>

              <div className="flex">
                <p className="w-32 text-sm text-gray-300">Full Name :</p>
                <p className="text-sm text-gray-400">{auth.user?.fullName}</p>
              </div>

              <div className="flex">
                <p className="w-32 text-sm text-gray-300">Date of Birth :</p>
                <p className="text-sm text-gray-400">{auth.user?.dateOfBirth}</p>
              </div>

              <div className="flex">
                <p className="w-32 text-sm text-gray-300">Nationality :</p>
                <p className="text-sm text-gray-400">{auth.user?.nationality}</p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              <div className="flex">
                <p className="w-32 text-sm text-gray-300">Address :</p>
                <p className="text-sm text-gray-400">{auth.user?.address}</p>
              </div>

              <div className="flex">
                <p className="w-32 text-sm text-gray-300">City :</p>
                <p className="text-sm text-gray-400">{auth.user?.city}</p>
              </div>

              <div className="flex">
                <p className="w-32 text-sm text-gray-300">Postcode :</p>
                <p className="text-sm text-gray-400">{auth.user?.postcode}</p>
              </div>

              <div className="flex">
                <p className="w-32 text-sm text-gray-300">Country :</p>
                <p className="text-sm text-gray-400">{auth.user?.country}</p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* 2 STEP VERIFICATION CARD */}
      <Card className="w-full max-w-5xl border border-white/10 bg-transparent rounded-xl">
        <CardHeader className="pb-7">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg">
              2 Step Verification
            </CardTitle>

            {/* {true ? (
              <Badge className="flex items-center gap-1 bg-green-600 text-white">
                <CheckCircle size={14} />
                Enabled
              </Badge>
            ) : (
              <Badge className="bg-orange-500 text-white">
                Disabled
              </Badge>
            )} */}

            {isTwoFactorEnabled ? (
              <Badge className="flex items-center gap-1 bg-green-600 text-white">
                <CheckCircle size={14} />
                Enabled
              </Badge>
            ) : (
              <Badge className="bg-orange-500 text-white">
                Disabled
              </Badge>
            )}

          </div>
        </CardHeader>

        <CardContent>
          <Dialog>

            {!isTwoFactorEnabled && (
              <DialogTrigger asChild>
                {/* <Button>
                Enable Two Step Verification
              </Button> */}
                <Button>Enable Two Step Verification</Button>
              </DialogTrigger>
            )}

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Verify your Account
                </DialogTitle>
              </DialogHeader>

              <AccountVerificationForm
                handleSubmit={handleEnableTwoStepVerification}
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

    </div>
  )
}

export default Profile
