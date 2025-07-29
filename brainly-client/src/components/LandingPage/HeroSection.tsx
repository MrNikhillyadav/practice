
const HeroSection = () => {
  return (
    <div className="w-full h-full mt-16 ">
       <div className=" flex flex-col gap-6 justify-center items-center">
             <div className=" text-center">
                <h1 
                    className="border rounded-full font-thin px-2 py-1 bg-gradient-to-b from-[#191919] to-[#242424] text-[12px] border-[#454545] ">
                    BEST CONTENT ORGANIZER 2025 
                </h1>
                    {/* <div className='w-full bg-white border inset-0 backdrop-blur-2xl '></div> */}
            </div>
            <div className=" text-7xl bg-gradient-to-b tracking-tight mt-4">
                <h1>Effortless Content Curation.</h1>
                <h1 className="text-[#989797] ">Never lose track again</h1>
            </div>

            <p className='text-center w-1/2 text-[#878787] font-md tracking-wide '>
                AI-powered platform that saves your favorite tweets, YouTube videos, and content
                in one organized space. Access everything instantly, anywhere.
            </p>

            <button className="bg-[#FF6A2F] cursor-pointer  font-medium rounded-lg px-6 py-3 text-center text-lg">Save Your First Content</button>
            <p className="text-[#878787] text-center">No credit required</p>
       </div>
    </div>
  )
}

export default HeroSection