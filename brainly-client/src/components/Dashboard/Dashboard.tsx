import { Button } from "../ui/Button";
import { FaShare } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";

export default function Dashboard(){
    return <div className="p-4 w-full h-screen rounded-2xl py-2 border-4 border-[#252525] bg-[#0E0E0E]">
        <div className="p-4 flex  justify-between items-center">
            <h1 className="text-xl font-medium">Dashboard</h1>

            <div className="flex items-center justify-between gap-4">
                <Button title="Add Content" variant="primary" startIcon={<FaPlusCircle/>} />
                <Button title="Share" variant="primary" startIcon={<FaShare/>} />
            </div>
        </div>
    </div>
}