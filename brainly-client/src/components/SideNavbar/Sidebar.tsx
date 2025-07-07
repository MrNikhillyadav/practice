
import SidebarItems from './SidebarItems';
import { RiTwitterXLine } from "react-icons/ri";
import { ImYoutube } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";


const items = [
    {
        id : 1,
        title : "Dashboard",
        icon : <RxDashboard/>
    },
    {
        id : 2,
        title : "Youtube",
        icon : <ImYoutube/>
    },  
    {
        id : 3,
        title : "Twitter",
        icon : <RiTwitterXLine/>
    },
]

export default function Sidebar(){


    return <div className="h-screen bg-[#252525] w-72 p-4 rounded-2xl">
            <div className="p-4"> <h1 className="font-bold text-xl">Copecart</h1> </div>

                <div className="rounded-sm p-2 w-full ">
                    {
                        items.map(({id,title, icon}) => (
                                <div
                                    className="cursor-pointer rounded-lg  hover:bg-[#3E3E3E] "
                                    key={id}>
                                    <SidebarItems title={title} icon={icon}  />
                                </div>
                        ))
                    }

                </div>
           
    </div>
}