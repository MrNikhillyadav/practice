
const DemoVideo = () => {
  return (
    <div className="w-full h-full bg-[#111111] mt-4 relative">
            <div className="absolute inset-0 mx-auto     bg-orange-500"></div>
       <div className="w-full h-full relative">
             <video muted autoPlay >
                <source src="https://github.githubassets.com/assets/hero-lg-c3f7fc42e245.mp4" />
            </video>
       </div>
    </div>
  )
}

export default DemoVideo