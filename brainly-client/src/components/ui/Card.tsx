import { FaShare } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CreateDeleteModal } from "./CreateDeleteModal";
import { useState } from "react";


interface CardProps {
    id : string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
}


export function Card({ id, title, link, type,}: CardProps) {
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    
    return <div>
        <div className="p-4 bg-[#191919] bg-opacity-0 border shadow-md border-[#252525] rounded-2xl max-w-72   min-h-48 min-w-72">
            <div className="flex items-center  justify-between">
                <div className="flex items-center gap-2  text-sm">
                    <div className="text-gray-500 ">
                       {type == "youtube" ? <ImYoutube /> :<FaXTwitter/> }
                    </div>
                    <div className="p-1 leading-4">{title}</div>
                </div>
                <div className=" flex items-end  gap-2 text-gray-500">
                        <a href={link} target="_blank">
                            <FaShare />
                        </a>
                        <div  className="cursor-pointer" onClick={() => setIsDeleteModalOpen(true)}> 
                            <RiDeleteBin5Fill/>
                        </div>
                </div>
            </div>

            <div>
                 <CreateDeleteModal 
                        id = {id}
                        open = {isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                    />
            </div>

            <div className="pt-2">
                {type === "youtube" && 
                <iframe className="w-full min-w-[10vw] min-h-[22vh] " 
                    src={link.replace("watch", "embed").replace("?v=", "/")} 
                    title="YouTube video player" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a> 
                </blockquote>}
            </div>

        </div>
    </div>
}