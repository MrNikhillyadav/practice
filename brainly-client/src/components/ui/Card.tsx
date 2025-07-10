import { FaShare } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export function Card({title, link, type}: CardProps) {
    return <div>
        <div className="p-4 bg-[#0E0E0E] border shadow-md border-[#252525] rounded-md max-w-72   min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-sm">
                    <div className="text-gray-500 pr-2">
                       {type == "youtube" ? <ImYoutube /> :<FaXTwitter/> }
                    </div>
                    <div className="p-1 leading-4">{title}</div>
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <FaShare />
                        </a>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                {type === "youtube" && 
                <iframe className="w-full" 
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