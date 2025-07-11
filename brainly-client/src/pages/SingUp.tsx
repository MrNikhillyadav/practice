import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignUp(){
        const Navigate = useNavigate()
        const usernameRef = useRef<HTMLInputElement>(null);
        const emailRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);

        async function signup(){
                const username = usernameRef.current?.value;
                const password = passwordRef.current?.value;
                const email = emailRef.current?.value;
                
                try {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", 
                        {
                                username : username,
                                email : email,
                                password : password    
                        }
                );

                        console.log(response)
                        alert(' Signup Successfull');
                        Navigate('/signin')
                }
                catch(error){

                        console.log(error.message)
                }               
               
                
                
        }
        return (
                <div className="bg-[#0E0E0E] flex items-center justify-center h-screen w-screen">
                        <div className=" grid grid-cols-2 border w-full  h-full bg-[#0E0E0E]  ">
                                <img 
                                        className="object-cover w-full h-full "
                                        src={'https://plus.unsplash.com/premium_photo-1751516658034-37c1fe51505e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D'} alt="Logo" />

                                <div className="shadow-md text-white flex-col   p-8 rounded-md bg-[#191919] grid justify-center items-center">

                                        <h1 className="text-xl text-white font-semibold text-center">Signup </h1>
                                        
                                        <div className="flex flex-col gap-2 justify-center items-center">
                                               <h1 className="text-xl text-white font-semibold text-center"> Create an account.</h1>
                                                <p className="text-[#878787]">Let's create  your brain.</p>
                                        </div>
                                                
                                        <div className="w-full h-full  flex flex-col gap-4 ">
                                                <Input reference={usernameRef} placeholder={'John Doe'}/>
                                                <Input reference={emailRef} placeholder={'johndoe@gmail.com'}/>
                                                <Input reference={passwordRef}  placeholder={'12345'}/>
                                                <Button  onClick={signup} title="Sign Up"/>
                                        </div>

                                                <p className="text-sm text-[#878787] m-2 "> If already registered ? Click here to  {" "}
                                                        <span onClick={() => Navigate('/signin')} 
                                                        className="text-blue-600 cursor-pointer hover:underline"> 
                                                                Sign in 
                                                        </span>
                                                </p>

                                </div>
                        </div>
                </div>
        )
}