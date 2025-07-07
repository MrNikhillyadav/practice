import Dashboard from '../components/Dashboard/Dashboard';
import Sidebar from '../components/SideNavbar/Sidebar';

export default function Workspace(){
    return (
        <div className="w-full h-screen bg-[#0E0E0E]  text-white">
                <div className='flex  rounded-2xl bg-[#252525] '>
                    <Sidebar/>
                    <Dashboard/>
                </div>
        </div>
    )
}