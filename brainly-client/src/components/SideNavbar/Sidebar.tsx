import SidebarItems from './SidebarItems';
import { RiTwitterXLine } from "react-icons/ri";
import { ImYoutube } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { MdCancel } from "react-icons/md";

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
  isOpen : boolean;
  onClose : () => void;
}

export default function Sidebar({isOpen,onClose}:SidebarInterface) {
  const location = useLocation();

  return (
    <div >
      {/* desktop screen sidebar */}
        <div className="hidden md:block h-screen  bg-[#191919] md:bg-[#252525] w-72 mt-1 md:p-4 md:rounded-2xl">
        <div className="p-4">
          <div className=" flex justify-between items-center font-bold md:text-xl">
            My Brain
            <div className=''>
              <MdCancel/>
            </div>
          </div>
        </div>

        <div className="rounded-sm  md:p-2 w-full">
          {
            items.map(({ id, title, icon, path }) => (
              <Link to={path} key={id} className={`cursor-pointer rounded-lg  block p-2 ${location.pathname === path ? 'bg-[#3E3E3E]' : ''}`}>
                <SidebarItems title={title} icon={icon} />
              </Link>
            ))
          }
        </div>
      </div>

      {/* mobile screen sidebar */}
     {isOpen && (
         <div className="md:hidden  backdrop-blur-2xl h-screen absolute z-2 top-0 -left-4 md:static p-4 bg-[#191919] md:bg-[#252525] w-72 mt-1  rounded-2xl">
        <div className="p-4">
          <div className=" flex md:block justify-between items-center font-bold md:text-xl">
            My Brain
            <div onClick={onClose} className=' md:hidden'>
              <MdCancel/>
            </div>
          </div>
        </div>

        <div className=" w-full">
          {
            items.map(({ id, title, icon, path }) => (
              <Link to={path} key={id} className={`cursor-pointer rounded-lg  block p-1 ${location.pathname === path ? 'bg-[#3E3E3E]' : ''}`}>
                <SidebarItems title={title} icon={icon} />
              </Link>
            ))
          }
      </div>
    </div>
     )}
    </div>
  )
}
