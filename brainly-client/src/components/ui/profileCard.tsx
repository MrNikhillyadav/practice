import { Button } from './Button';
import avatar from "../../assets/avatar.png"


interface ProfileCardInterface {
    isLoggedIn : boolean,
    setIsLoggedIn: () => void;

}


export const ProfileCard = ({isLoggedIn,setIsLoggedIn}:ProfileCardInterface) => {
    
    return (
    <>
        { isLoggedIn &&
        (<>
                <div className="flex  cursor-pointer   my-2 flex-col items-start justify-center bg-[#252525] w-full p-4 mx-2 rounded-md">
                        <div className="flex my-2 w-full justify-between items-center">
                                <img 
                                    className="rounded-full w-10 h-10 text-2xl object-fit" 
                                    src={ avatar}
                                    alt="logo" 
                                />
                               
                                <Button title="Logout" variant="primary" onClick={setIsLoggedIn} />
                        </div>

                        <div className='flex flex-col '>
                                <span className="text-sm">Username</span>
                                <span className="text-xs">user_email@gmail.com</span>
                        </div>

                        
                    
                </div>
            </>) 
        }
    </>
    )
}