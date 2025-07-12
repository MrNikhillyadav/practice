import Dashboard from '../components/Dashboard/Dashboard';
import Sidebar from '../components/SideNavbar/Sidebar';

interface WorkspaceInterface {
    filter : string;
}

export default function Workspace({filter}:WorkspaceInterface){

    return (
        <div className="w-full h-screen bg-[#0E0E0E]  text-white">
                <div className='flex  md:rounded-2xl bg-[#252525] '>
                    <div className='hidden md:block'>
                        <Sidebar/>
                    </div>
                    <Dashboard filter={filter} />
                </div>
        </div>
    )
}