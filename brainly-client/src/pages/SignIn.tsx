import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'

export default function SignIn(){
        const Navigate = useNavigate()
        const emailRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
                emailRef?.current?.focus()
        },[])

        async function SignIn(){
                const email = emailRef.current?.value;
                const password = passwordRef.current?.value;
                const loadId = toast.loading('Signing in...')

                if (!email || !password) {
                        toast.error('Email and password required, try again!')
                        toast.dismiss(loadId)
                        return
                }
                
                const response = await axios.post("http://localhost:3000/api/v1/user/signin", 
                    {
                        email,
                        password,
                    }
                )

                const jwt = response.data.token 
                localStorage.setItem('token',jwt)
                console.log("response.status : ", response.status)

                if (response.status === 200) {
                        Navigate('/dashboard')

                        toast.success(`Signed In successfully! 🎉🥳`)
                        toast.dismiss(loadId)
                        return;
                } 
               
                
                
        }
        return (
                <div className="bg-[#0E0E0E] flex items-center justify-center h-screen w-screen">
                        <div className=" grid grid-cols-2 border w-full  h-full bg-[#0E0E0E]  ">
                                <img 
                                        className="object-cover w-full h-full "
                                        src={'https://plus.unsplash.com/premium_photo-1726126478618-cd7e559633a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQwfHx8ZW58MHx8fHx8'} alt="Logo" />

                                <div className="shadow-md text-white flex-col   p-8 rounded-md bg-[#191919] grid justify-center items-center">
                                        <h1 className="text-xl text-white font-semibold text-center">Signin </h1>

                                        <div className="flex flex-col gap-2 justify-center items-center">
                                               <h1 className="text-xl text-white font-semibold text-center"> Welcome Back!</h1>
                                                <p className="text-[#878787]">Let's login to your brain.</p>
                                        </div>
                                                
                                        <div className="w-full h-full  flex flex-col gap-4 ">
                                                <Input reference={emailRef} placeholder={'johndoe@gmail.com'}/>
                                                <Input reference={passwordRef}  placeholder={'12345'}/>
                                                <Button variant="primary" onClick={SignIn} title="Login"/>
                                        </div>

                                                <p className="text-sm text-[#878787] m-2 ">Don't have an account yet ? Click here to  {" "}
                                                        <span onClick={() => Navigate('/signup')} 
                                                        className="text-blue-600 cursor-pointer hover:underline"> 
                                                                Sign up 
                                                        </span>
                                                </p>

                                </div>
                        </div>
                </div>
        )
}