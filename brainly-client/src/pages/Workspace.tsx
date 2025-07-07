import Dashboard from '../components/Dashboard/Dashboard';
import Sidebar from '../components/SideNavbar/Sidebar';

export default function Workspace(){
    return (
        <div className="w-full h-screen  ">
                <div className='flex '>
                    <Sidebar/>
                    <Dashboard/>
                </div>
        </div>
    )
}