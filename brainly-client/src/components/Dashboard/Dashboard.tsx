import { Button } from "../ui/Button";
import { FaShare } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { CreateContentModal } from "../ui/CreateContentModal";
import { useEffect, useState } from "react";
import { useContent } from "../../hooks/useContent";
import { Card } from "../ui/Card";
import { useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "../SideNavbar/Sidebar";


interface DashboardInterface {
    filter: string;
}

export default function Dashboard({ filter }: DashboardInterface) {
    const [isOpen, SetIsOpen] = useState(false);
    const [isSideNavOpen,setIsSideNavOpen] = useState(false);
    const { contents, refresh } = useContent();
    const location = useLocation();


    useEffect(() => {
        refresh();
    }, [isOpen, refresh, location.pathname]);

    const filteredContents = filter
        ? contents.filter((content) => content.type === filter)
        : contents;

    return (
        <div className="p-4 w-full h-full min-h-screen rounded-2xl py-2 border-4 border-[#252525] bg-[#0E0E0E] ">
            <CreateContentModal 
                open={isOpen} 
                onClose={() => SetIsOpen(false)} 
            />
                
            <div className="md:hidden absolute z-4 border  ">
                <Sidebar isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} />
            </div>
                

            <div className="p-2 md:p-4  z-2 md:z-0 backdrop-blur-2xl md:border-0 bg-[#191919da] md:bg-[#0E0E0E] rounded-xl  fixed top-6 left-6 right-6 md:static flex justify-between items-start">
                <h1 className="hidden md:block text-md md:text-xl font-medium">Dashboard</h1>

                <div className="md:hidden flex justify-center items-center gap-2  text-md md:text-xl ml-2 font-medium">
                    <span onClick={() => setIsSideNavOpen(true)} >
                        <RxHamburgerMenu/>
                    </span>
                    My Brain 
                </div>
                
                 
                
            {/* Button : ADD | SHARE */}
                <div className="flex items-center justify-between gap-1 md:gap-4">
                    <Button
                        variant="primary"
                        onClick={() => SetIsOpen(true)}
                        title="Add "
                        startIcon={<FaPlusCircle />}
                    />
                    <Button title="Share" startIcon={<FaShare />} />
                </div>
            </div>

            {/* cards */}
            <div className="flex flex-wrap gap-6 p-2 mt-16 md:mt-8">

                {filteredContents.map(({ _id, title, link, type }) => (
                    <Card 
                        key={_id}
                        id={_id} 
                        type={type} 
                        title={title} 
                        link={link} 
                    />
                ))}
                
            </div>
        </div>
    );
}
