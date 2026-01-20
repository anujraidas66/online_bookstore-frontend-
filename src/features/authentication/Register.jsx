import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useUserRegisterMutation } from "./authApi"

const registerSchema = Yup.object({
  username: Yup.string().min(3).required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(3, "Minimum 3 characters").required("Password is required"),
})

export default function Register() {
  const [userRegister, { isLoading }] = useUserRegisterMutation()
  const nav = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 bg-gray-50">

      {/* Card */}
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <CardHeader className="text-center sm:text-left">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Signup to your account</CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-base">
            Enter your email below to register
          </CardDescription>
          <CardAction>
            <Button onClick={() => nav(-1)} variant="link" className="text-sm sm:text-base">
              Login
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={registerSchema}
            onSubmit={async (val) => {
              try {
                await userRegister(val).unwrap()
                toast.success("Register successfully")
                nav(-1)
              } catch (err) {
                toast.error(err.data?.data || "Registration failed")
              }
            }}
          >
            {({ values, handleChange, touched, handleSubmit, errors }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">

                  {/* Username */}
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="John Doe"
                      value={values.username}
                      onChange={handleChange}
                      className="text-sm sm:text-base md:text-base"
                    />
                    {errors.username && touched.username && (
                      <p className="text-red-500 text-xs sm:text-sm md:text-sm">{errors.username}</p>
                    )}
                  </div>

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
                  <div className="w-full max-w-xs sm:max-w-full space-y-2">
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
                        {showPassword ? <EyeOffIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
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
                      <Spinner className="mr-2" /> Submit
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full mt-5 py-2 sm:py-3 text-sm sm:text-base md:text-base"
                    >
                      Submit
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


// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useNavigate } from "react-router-dom"
// import { Formik } from "formik"
// import * as Yup from "yup"
// import toast from "react-hot-toast"
// import { useState } from "react"
// import { Spinner } from "@/components/ui/spinner"
// import { EyeIcon, EyeOffIcon } from "lucide-react"
// import { useUserRegisterMutation } from "./authApi"

// const loginSchema = Yup.object({
//   username: Yup.string().min(3).required("Username is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().min(3, "Minimum 3 characters").required("Password is required"),
// })

// export default function Register() {
//   const [userRegister, {isLoading}] = useUserRegisterMutation();
//   const nav = useNavigate()
//   const [showPassword, setShowPassword] = useState(false)

//   return (
//     <div className="p-5">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle>Signup to your account</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//           <CardAction>
//             <Button onClick={() => nav(-1)} variant="link">
//               Login
//             </Button>
//           </CardAction>
//         </CardHeader>

//         <CardContent>
//           <Formik
//             initialValues={{ 
//               username:"",
//               email: "", 
//               password: ""
//             }}

//             onSubmit={async (val) => {
//               try {
//                await userRegister(val).unwrap()
//                toast.success('Register successfully ');
//                nav(-1);
//               } catch (err) {
//                 toast.error(err.data.data);
//               }
//             }}

//            validationSchema={loginSchema}
//           >
//             {({ values, handleChange, touched, handleSubmit, errors }) => (
//               <form onSubmit={handleSubmit}>
//                 <div className="flex flex-col gap-6">
              
//                <div className="grid gap-2">
//                     <Label htmlFor="username">Username</Label>
//                     <Input
//                       id="username"
//                       name="username"
//                       type="username"
//                       placeholder="Johne Doe"
//                       value={values.username}
//                       onChange={handleChange}
//                     />
//                     {errors.username && touched.username && 
//                       <p className="text-red-500">{errors.username}</p>
//                     }
//                     </div>


//                   <div className="grid gap-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       placeholder="m@example.com"
//                       value={values.email}
//                       onChange={handleChange}
//                     />
//                     {errors.email && touched.email && 
//                       <p className="text-red-500">{errors.email}</p>
//                     }
//                   </div>


//                 <div className='w-full max-w-xs space-y-2'>
//                 <Label >Password</Label>
//                 <div className='relative'>
//                   <Input 
//                  onChange={handleChange}
//                  value={values.password}
//                  type={showPassword ? 'text' : 'password'} name='password'
//                  placeholder='*******' className='pr-9' />

//                   <Button
//                   type='button'
//                   onClick={() => setShowPassword(!showPassword)}
//                     variant='ghost'
//                    size='icon'
//                     className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'>
//                     {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                     <span className='sr-only'>Show password</span>
//                   </Button>
//                 </div>
//                 {errors.password && touched.password && <p className="text-red-500" >{errors.password}</p>}
//               </div>
//           </div>

//           {isLoading ? <Button size="sm" variant="outline" disabled 
//            className="w-full mt-5" >
//               <Spinner />
//                   Submit
//                 </Button> : <Button type="submit" className="w-full mt-5" >
//                   Submit
//                 </Button> }
        
//               </form>
//             )}
//           </Formik>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
