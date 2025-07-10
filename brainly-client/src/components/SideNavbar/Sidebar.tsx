import SidebarItems from './SidebarItems';
import { RiTwitterXLine } from "react-icons/ri";
import { ImYoutube } from "react-icons/im";
import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

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

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen bg-[#252525] w-72 p-4 rounded-2xl">
      <div className="p-4">
        <h1 className="font-bold text-xl">Copecart</h1>
      </div>

      <div className="rounded-sm p-2 w-full">
        {
          items.map(({ id, title, icon, path }) => (
            <Link to={path} key={id} className={`cursor-pointer rounded-lg  block p-2 ${location.pathname === path ? 'bg-[#3E3E3E]' : ''}`}>
              <SidebarItems title={title} icon={icon} />
            </Link>
          ))
        }
      </div>
    </div>
  )
}
