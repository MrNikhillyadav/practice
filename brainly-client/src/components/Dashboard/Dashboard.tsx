import { Button } from "../ui/Button";
import { FaShare } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import {CreateContentModal} from "../ui/CreateContentModal";
import { useEffect, useState } from "react";
import { useContent } from "../../hooks/useContent";
import { Card } from "../ui/Card";
import { useLocation } from "react-router-dom";

interface DashboardInterface {
    filter : string;
}

export default function Dashboard({filter}:DashboardInterface){
    const [isOpen, SetIsOpen] = useState(false); 
    const {contents,refresh} = useContent();
    const location = useLocation();
    console.log('location: ', location.pathname);

    useEffect(() => {
        refresh();
    },[isOpen,refresh, location.pathname])

    const filteredContents = filter ? contents.filter( content => content.type === filter) : contents;

    return <div className="p-4 w-full h-screen rounded-2xl py-2 border-4 border-[#252525] bg-[#0E0E0E]">
        <div className="p-4 flex  justify-between items-center">
            <h1 className="text-xl font-medium">Dashboard</h1>

            <div className="flex justify-center absolute z-2 transition-all duration-300 items-center"> 
                <CreateContentModal open={isOpen} onClose={() => SetIsOpen(false)} />
            </div>

            <div className="flex items-center justify-between gap-4">
                <Button variant="primary" onClick={() => SetIsOpen(true)} title="Add Content"  startIcon={<FaPlusCircle/>} />
                <Button  title="Share"  startIcon={<FaShare/>} />
            </div>


        </div>
             {/* cards */}
              <div className=' flex flex-wrap gap-6 p-2 mt-8 '>
                { filteredContents.map(({_id,title,link,type}) => (
                    <Card 
                      key={_id  }
                      type={type} 
                      title={title} 
                      link={link} 
                    />
                ))}
              </div>
    </div>
}