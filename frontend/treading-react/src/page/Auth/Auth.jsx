import React from "react"
import "./Auth.css"
import SignupForm from "./SignupForm"
import SigninForm from "./SigninForm"
import ForgotPasswordForm from "./ForgotPasswordForm"
import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="authContainer">
      <div className="overlay">
        <div className="authBox text-center">

          <h1 className="text-5xl font-bold text-white mb-10 tracking-wide">
            Stock Nova
          </h1>
        
  <div className="max-h-[70vh] overflow-y-auto px-2">
          {location.pathname === "/signup" ? (

            <section>
              <SignupForm />

              <div className="flex flex-col items-center justify-center mt-6 gap-2">
                <span className="text-gray-300 text-sm">
                  have already account ?
                </span>

                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-6"
                  onClick={() => navigate("/signin")}
                >
                  signin
                </Button>
              </div>
            </section>

          ) : location.pathname === "/forgot-password" ? (

            <section>
              <ForgotPasswordForm />

              <div className="flex flex-col items-center justify-center mt-6 gap-2">
                <span className="text-gray-300 text-sm">
                  Back to login
                </span>

                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-6"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
              </div>
            </section>

          ) : (

            <section>
              <SigninForm />

              <div className="flex flex-col items-center justify-center mt-6 gap-2">
                <span className="text-gray-300 text-sm">
                  Don’t have an account?
                </span>

                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-6"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </div>

              <div className="flex flex-col items-center justify-center mt-6 gap-2">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black px-6"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password !!
                </Button>
              </div>

            </section>

          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
