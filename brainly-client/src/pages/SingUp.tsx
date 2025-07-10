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
                console.log('username: ', username);
                const password = passwordRef.current?.value;
                console.log('password: ', password);
                const email = emailRef.current?.value;
                console.log('email: ', email);
                
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
        return (
                <div className="bg-gray-300  flex justify-center items-center h-screen w-screen">
                        <div className="flex shadow-md flex-col min-w-[24vw] p-6 py-8 gap-2 rounded-md bg-white justify-between items-center">
                                <h1 className="text-xl font-semibold text-center">SignUp</h1>
                                        
                                        <Input reference={usernameRef} placeholder={'John Doe'}/>
                                        <Input reference={emailRef} placeholder={'johndoe@gmail.com'}/>
                                        <Input reference={passwordRef}  placeholder={'12345'}/>
                                        <Button onClick={signup} title="Sign Up"/>
                                        <p className="text-sm mt-2 text-gray-700"> If already registered ? Click here to 
                                                 <span onClick={() => Navigate('/signin')} className="text-blue-600 cursor-pointer hover:underline"> Sign in </span> </p>

                        </div>
                </div>
        )
}