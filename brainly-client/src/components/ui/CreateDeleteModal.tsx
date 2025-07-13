import axios from "axios";
import { Button } from "./Button";
import { MdCancel } from "react-icons/md";
import { useContent } from "../../hooks/useContent";

interface DeleteModalInterface {
    id : string;
    open : boolean;
    onClose : () => void;
}

export function CreateDeleteModal({id,open,onClose}:DeleteModalInterface){
    const { refresh } = useContent();

    async function handleDelete(id : string){
            await axios.delete(`http://localhost:3000/api/v1/content/remove/${id}`,
                {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            refresh();
            onClose();
    }

    return (
        <div>
            { open && (
                 <div className="bg-[#0e0e0ed0] shadow-md bg-opacity-10 flex justify-center items-center h-screen w-screen top-0 left-0 fixed">
                    <div className=" flex flex-col max-w-4xl items-start  gap-6 bg-[#191919] rounded-lg shadow-xl  md:p-12">

                        <div className="flex justify-between w-full items-center">
                            <h1 className="text-xl font-md">Delete Post</h1>
                            <div onClick={onClose} className="cursor-pointer">
                                <MdCancel/>
                            </div>
                        </div>

                        <p className="text-[#878787] ">Are you sure you want to delete this ?</p>

                        <div className="md:pl-20 flex  w-full  items-end gap-2">
                            <Button title={"Nevermind"} onClick={onClose} />
                            <Button variant="primary" title={"Confirm"} onClick={(() => handleDelete(id))} />
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}