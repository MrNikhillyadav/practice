import { useRef, useState } from "react"
import { Button } from "./Button"
import { ImCancelCircle } from "react-icons/im";
import { Input } from "./Input";
import axios from "axios";

interface ModalInterface {
        open : boolean,
        onClose : () => void
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({open, onClose}:ModalInterface){

        const titleRef = useRef<HTMLInputElement >(null)
        const linkRef = useRef<HTMLInputElement >(null)
        const [type,setType] = useState('')

        async function CreateContent(){
               const title = titleRef.current?.value;
               const link = linkRef.current?.value
                
                 await axios.post(`https://localhost:3000/api/v1/content`, {
                            link,
                            title,
                            type 
                        }, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        })

                        onClose();
        }

        const isValid = type !== "" && titleRef.current?.value !== "" && linkRef.current?.value !== "";


return (
<div>
        {open && <div className="bg-[#0e0e0ed0] shadow-md bg-opacity-10 flex justify-center items-center h-screen w-screen top-0 left-0 fixed">
                <div  className="flex flex-col outline-none justify-center items-center rounded-md drop-shadow-sm  bg-[#191919] w-[30vw] p-8">

                        <div className="flex mb-4   w-full  justify-between items-center ">
                                <h2 className=" font-bold text-lg ">Add Note</h2>

                                <div className=" p-1 text-center flex items-center  rounded-full hover:bg-[#3E3E3E] cursor-pointer">
                                        <ImCancelCircle onClick={onClose}  />
                                </div>
                        </div>

                        <div className=" flex flex-col justify-center  items-center w-full gap-4">
                                <Input reference={titleRef}  placeholder={'e.g. Musk came up with American Party'}/>
                                <Input reference={linkRef} placeholder={'e.g. https://x.com/kevinlu625'}/>

                                <p className="text-gray-400 text-sm inline-flex w-full text-start ">choose Content-type</p>

                                <div className="flex gap-2  items-start w-full">
                                        <Button title="Twitter" onClick={() => setType(ContentType.Twitter)} variant={type == ContentType.Twitter && "secondary"} />
                                        <Button title="Youtube" onClick={() => setType(ContentType.Youtube)} variant={type == ContentType.Youtube && "secondary"} />
                                </div>
                                <Button variant={isValid && "primary" } onClick={CreateContent}  title="Submit" className= "mt-10 "/>

                        </div>


                </div>
        </div>}


</div>
)
}