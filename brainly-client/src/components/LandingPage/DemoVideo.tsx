
import demoVideo from "../../assets/demoVideo.mp4"

const DemoVideo = () => {
  return (
    <div className="w-full h-full bg-[#111111] mt-4 relative rounded-2xl">
            <div className="absolute inset-0 mx-auto top-0 blur-lg opacity-80 bg-orange-500"></div>
       <div className="w-full h-full relative rounded-2xl pt-1">
            <video className="rounded-2xl" muted autoPlay src={demoVideo}></video>
       </div>
    </div>
  )
}

export default DemoVideo