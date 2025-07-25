import { Button } from "../ui/Button";
import { FaShare } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { CreateContentModal } from "../ui/CreateContentModal";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useContent } from "../../hooks/useContent";
import { Card } from "../ui/Card";
import { useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Sidebar from "../SideNavbar/Sidebar";
import { useShareLink } from "../../hooks/useShareLink";

interface DashboardInterface {
    filter: string;
}

interface Content {
    _id: string;
    title: string;
    link: string;
    type: string;
    userId?: string;
}

export default function Dashboard({ filter }: DashboardInterface) {
    const [isOpen, SetIsOpen] = useState(false);
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const { contents, refresh } = useContent();
    const { getShareLink, isLoading, isCopied } = useShareLink();
    const location = useLocation();
    
    useEffect(() => {
        refresh();
    }, [isOpen, refresh, location.pathname]);

    const handleShareLink = useCallback(() => {
        console.log("getShareLink called onClick!")
        getShareLink()
    }, [getShareLink])
    
    const filteredContents = useMemo(() => {
        return filter
            ? contents.filter((content:Content) => content.type === filter)
            : contents;
    }, [contents, filter]);

    const buttonContent = useMemo(() => {
        if (isLoading) {
            return {
                title: "Generating...",
                icon: <AiOutlineLoading3Quarters className="animate-spin" />
            }
        }
        if (isCopied) {
            return {
                title: "Link Copied!",
                icon: <FaShare />
            }
        }
        return {
            title: "Share",
            icon: <FaShare />
        }
    }, [isLoading, isCopied]);

    const handleModalOpen = useCallback(() => SetIsOpen(true), []);
    const handleModalClose = useCallback(() => SetIsOpen(false), []);
    const handleSideNavOpen = useCallback(() => setIsSideNavOpen(true), []);
    const handleSideNavClose = useCallback(() => setIsSideNavOpen(false), []);

    return (
        <div className="p-6 w-full h-full min-h-screen rounded-2xl py-2 border-4 border-[#191919e7] bg-[#0E0E0E] ">
            <CreateContentModal 
                open={isOpen} 
                onClose={handleModalClose} 
            />
                
            <div className="md:hidden absolute z-4 border  ">
                <Sidebar isOpen={isSideNavOpen} onClose={handleSideNavClose} />
            </div>
                

            <div className="p-2 md:p-4   outline-none  z-2 md:z-0 backdrop-blur-2xl md:border-0 bg-[#191919da] md:bg-[#0E0E0E] rounded-xl  fixed top-6 left-6 right-6 md:static flex justify-between items-start">
                <h1 className="hidden md:block text-md md:text-xl font-medium">Dashboard</h1>

                <div className="md:hidden flex justify-center items-center gap-2  text-md md:text-xl ml-2 font-medium">
                    <span onClick={handleSideNavOpen} >
                        <RxHamburgerMenu/>
                    </span>
                    My Brain 
                </div>
                
                 
                
            {/* Button : ADD | SHARE */}
                <div className="flex items-center justify-between gap-1 md:gap-4">
                    <Button
                        variant="primary"
                        onClick={handleModalOpen}
                        title="Add "
                        startIcon={<FaPlusCircle />}
                    />
                    <Button 
                        onClick={handleShareLink}
                        title={buttonContent.title}
                        variant={isCopied ? "primary" : undefined}
                        startIcon={buttonContent.icon}
                    />
                </div>
            </div>

            {/* cards */}
            <div className="flex flex-wrap gap-6 p-2 mt-18 md:mt-0">

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