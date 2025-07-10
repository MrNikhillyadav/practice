import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn(){
        const Navigate = useNavigate()
        const emailRef = useRef<HTMLInputElement>(null);
        console.log('emailRef: ', emailRef.current);
        const passwordRef = useRef<HTMLInputElement>(null);

        async function SignIn(){
                const email = emailRef.current?.value;
                const password = passwordRef.current?.value;
                
                const response = await axios.post("http://localhost:3000/api/v1/user/signin", 
                    {
                        email,
                        password,
                    }
                )

                const jwt = response.data.token 
                localStorage.setItem('token',jwt)
                
                Navigate('/dashboard')
                
        }
        return (
                <div className="bg-gray-300  flex justify-center items-center h-screen w-screen">
                        <div className="flex shadow-md flex-col min-w-[24vw] p-6 py-8 gap-2 rounded-md bg-white justify-between items-center">
                                <h1 className="text-xl font-semibold text-center">Sign In</h1>
                                        <Input reference={emailRef} placeholder={'email'}/>
                                        <Input reference={passwordRef} placeholder={'12345'}/>
                                        <Button onClick={SignIn}   title="Sign in"/>
                                         <p className="text-sm mt-2 text-gray-700"> Haven't already registered ? Click here to 
                                                 <span onClick={() => Navigate('/signup')} className="text-blue-600 cursor-pointer hover:underline"> Sign up </span> </p>


                        </div>
                </div>
        )
}