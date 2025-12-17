import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const Navigate = useNavigate();

  useEffect(() => {
    usernameRef?.current?.focus();
  }, []);

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;

    const loadId = toast.loading("Signing up...");

    if (!email || !password) {
      toast.error("Email and password required, try again!");
      toast.dismiss(loadId);
      return;
    }

    if (!email?.includes("@")) {
      toast.error("email should include '@' ");
      toast.dismiss(loadId);
      return;
    }

    console.log("Attempting signup with:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password ? "******" : "undefined");
    console.log("Backend URL:", BACKEND_URL);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        {
          username: username,
          email: email,
          password: password,
        },
      );

      toast.dismiss(loadId); 

      if (response.status === 200) {
        toast.success(`Signed Up successfully 🎉🥳`);
        Navigate("/signin");
         toast.dismiss(loadId) 
      } else {
        toast.error(
          `Signup failed: ${response.data?.message || response.statusText || "Unknown error"}`,
        );
        console.error("Signup response was not 200:", response);
      }
    } catch (error: unknown) {
      console.error("Signup request failed:", error);
    
      let message = "Network error";
    
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
    
      toast.error(`Signup failed: ${message}`);
      toast.dismiss(loadId);
    }
  }

  const isValid =
    emailRef.current?.value !== "" &&
    usernameRef.current?.value !== "" &&
    passwordRef.current?.value !== "";

  console.log("isValid:", isValid);

  return (
    <div className="bg-[#0E0E0E] flex items-center justify-center  h-screen w-screen">
      <div className=" grid md:grid-cols-2 border w-full  h-full bg-[#0E0E0E]  ">
        <img
          className="  md:object-cover w-full h-full  "
          src={
            "https://plus.unsplash.com/premium_photo-1751516658034-37c1fe51505e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D"
          }
          alt="Logo"
        />

        <div className="shadow-md text-white flex-col absolute  z-2  md:static  w-full h-full  p-8 md:rounded-md bg-[#1d1c1cf1] md:bg-[#191919] grid justify-center items-center">
          <h1 className="text-xl text-white font-semibold text-center">
            Signup{" "}
          </h1>

          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="text-xl text-white font-semibold text-center">
              {" "}
              Create an account.
            </h1>
            <p className="text-[#878787]">Let's create your brain.</p>
          </div>

          <div className=" flex flex-col w-full h-full  gap-4 ">
            <Input reference={usernameRef} placeholder={"John Doe"} />
            <Input reference={emailRef} placeholder={"johndoe@gmail.com"} />
            <Input reference={passwordRef} placeholder={"12345"} />
            <Button
              title="Sign Up"
              variant={isValid ? "primary" : "secondary"}
              onClick={signup}
            />
          </div>

          <p className="text-sm text-[#878787] m-2 text-center">
            {" "}
            If already registered ? Click here to{" "}
            <span
              onClick={() => Navigate("/signin")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}