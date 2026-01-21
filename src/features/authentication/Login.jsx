import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Formik } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { useUserLoginMutation } from "./authApi"
import { setUser } from "../user/userSlice"

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4, "Minimum 4 characters").required("Password is required"),
})

export default function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loginUser, { isLoading }] = useUserLoginMutation()

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 bg-gray-50">
      
      {/* Card */}
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <CardHeader className="text-center sm:text-left">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Login to your account</CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-base">
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button onClick={() => nav("/signup")} variant="link" className="text-sm sm:text-base">
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{ email: "", 
              password: "" }}
            validationSchema={loginSchema}
            onSubmit={async (val) => {
              try {
                const response = await loginUser(val).unwrap()
                toast.success("Login successful")
                dispatch(setUser(response.data))
                nav(-1)
              } catch (err) {
                toast.error(err.data?.data || "Login failed")
              }
            }}
          >
            {({ values, handleChange, touched, handleSubmit, errors }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">

                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      value={values.email}
                      onChange={handleChange}
                      className="text-sm sm:text-base md:text-base"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-xs sm:text-sm md:text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="grid gap-2 w-full max-w-xs sm:max-w-full">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        onChange={handleChange}
                        value={values.password}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="*******"
                        className="pr-9 text-sm sm:text-base md:text-base"
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                      >
                        {showPassword ? <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5"/> : <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5"/>}
                        <span className="sr-only">Show password</span>
                      </Button>
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-red-500 text-xs sm:text-sm md:text-sm">{errors.password}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  {isLoading ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                      className="w-full mt-5 py-2 sm:py-3"
                    >
                      <Spinner className="mr-2" /> Login
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full mt-5 py-2 sm:py-3 text-sm sm:text-base md:text-base">
                      Login
                    </Button>
                  )}

                </div>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  )
}


