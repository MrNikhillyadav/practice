import SidebarItems from './SidebarItems';
import { RiTwitterXLine } from "react-icons/ri";
import { ImYoutube } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdCancel, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { ProfileCard } from '../ui/profileCard';
import { useState } from 'react';

const items = [
  {
    id: 1,
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard"
  },
  {
    id: 2,
    title: "Youtube",
    icon: <ImYoutube />,
    path: "/youtube"
  },
  {
    id: 3,
    title: "Twitter",
    icon: <RiTwitterXLine />,
    path: "/twitter"
  },
]

interface SidebarInterface {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarInterface) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoggedIn(false);
    navigate('/signin');
  }

  if (!isOpen) return null;

  return (
    <>
      {/* 🔹 Desktop Sidebar */}
      <div className="hidden md:flex items-center  md:flex-col h-screen justify-between md:bg-[#191919e7] w-72 md:p-4 md:rounded-2xl">
        <div className='flex flex-col gap-8 w-full justify-center items-center'>
          <div className="flex w-full p-4 justify-between items-center font-bold md:text-xl">
            My Brain
            <div onClick={onClose} className='text-2xl cursor-pointer absolute top-8 left-50 '>
              <MdOutlineKeyboardDoubleArrowLeft />
            </div>
          </div>

          <div className="rounded-sm md:p-2 w-full">
            {items.map(({ id, title, icon, path }) => (
              <Link to={path} key={id} className={`cursor-pointer rounded-lg block p-2 ${location.pathname === path ? 'bg-[#3E3E3E]' : ''}`}>
                <SidebarItems title={title} icon={icon} />
              </Link>
            ))}
          </div>
        </div>

        <ProfileCard isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} />
      </div>

      {/* 🔹 Mobile-screen Sidebar */}
      <div className="md:hidden flex flex-col items-center backdrop-blur-2xl h-screen fixed z-4 border border-[#414040] top-0 -left-4 mt-0 p-8 bg-[#191919e7] w-72 rounded-2xl drop-shadow-2xl">
        <div className='w-full flex flex-col justify-between items-center gap-8 p-4'>
          <div className="flex w-full justify-between items-center font-bold md:text-xl">
            My Brain
            <div onClick={onClose} className='md:hidden'>
              <MdCancel />
            </div>
          </div>

          <div className="w-full mt-2 mb-20">
            {items.map(({ id, title, icon, path }) => (
              <Link to={path} key={id} className={`cursor-pointer rounded-lg block p-1 ${location.pathname === path ? 'bg-[#3E3E3E]' : ''}`}>
                <SidebarItems title={title} icon={icon} />
              </Link>
            ))}
          </div>
        </div>

        <ProfileCard isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} />
      </div>
    </>
  );
}
