import { BsArrowRight } from "react-icons/bs"

const Navbar = () => {
     const items = [
        {
            id : "1",
            title : "Use Cases"
        },
        {
            id : "2",
            title : "Features"
        },
        {
            id : "3",
            title : "Pricing"
        },
        {
            id : "4",
            title : "Resources"
        },
    ]

  return (
    <div className="w-full h-full rounded-xl  shadow-2xl bg-gradient-to-b from-[#181818] to-[#111111] ">
        <div className=" w-full grid  md:px-2 md:py-2 md:grid-cols-3">
            <div className=" flex items-center gap-6 text-md text-[#878787] justify-evenly">
                {items.map(({id,title}) => (
                    <ul key={id} >
                        <li>{title}</li>
                    </ul>
                ))}
            </div>

            <h1 className=" text-md md:text-xl p-1 font-bold tracking-wider">
                brainly
            </h1>

            <div className="flex items-center justify-end p gap-4">
                <button className="text-[#878787] px-4 py-2 rounded-lg  ">Login</button>
                <button 
                    className=" text-white flex justify-between gap-4 items-center px-4 py-2 rounded-lg bg-[#252525]">
                        Start Free Trial <span><BsArrowRight /></span>

                </button>
            </div>

        </div>
    </div>
  )
}

export default Navbar