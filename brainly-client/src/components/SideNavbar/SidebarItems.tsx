import type { JSX } from "react"

interface SidebarItemsInterface {
    title : string,
    icon : JSX.Element,
    onClick? : () => void,
}



export default function SidebarItems({icon, title}:SidebarItemsInterface){
    return (
        <div>
            <div className="flex justify-start gap-2 px-3 py-1 cursor-pointer items-center">
                <div className="text-[#878787]">{icon}</div>
                <div className="text-sm  ">{title}</div>
            </div>
        </div>
    )
}