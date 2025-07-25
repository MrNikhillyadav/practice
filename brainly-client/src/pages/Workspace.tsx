import { useState } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Sidebar from '../components/SideNavbar/Sidebar';
import { MdOutlineKeyboardDoubleArrowRight} from "react-icons/md";

interface WorkspaceInterface {
    filter : string;
}

export default function Workspace({filter}:WorkspaceInterface){
    const [isSidebarOpen,setIsSidebarOpen] = useState(true)

    function handleSidebar(){
        console.log('closed sidebar')
        setIsSidebarOpen(false)
    }

    return (
        <div className="w-full h-full bg-[#0E0E0E]  text-white">
            {!isSidebarOpen && (
                <div className='text-3xl hidden md:block  transition-all duration-200 cursor-pointer absolute top-6  left-2 z-50 '>
                        < MdOutlineKeyboardDoubleArrowRight  
                            onClick={() => setIsSidebarOpen(true)}
                            onMouseEnter={() => setIsSidebarOpen(true)}
                        />
                    </div>
            )
            }
                     
                <div className='flex md:rounded-2xl bg-[#191919e7] '>
                    <Sidebar isOpen={isSidebarOpen} onClose={handleSidebar} />
                    <Dashboard filter={filter} />
                </div>
        </div>
    )
}