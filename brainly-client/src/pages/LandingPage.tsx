import DemoVideo from "../components/LandingPage/DemoVideo"
import Features from "../components/LandingPage/Features"
import HeroSection from "../components/LandingPage/HeroSection"
import Navbar from "../components/LandingPage/Navbar"

const LandingPage = () => {
 
   
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#191919] to-[#111111] text-white">
        <div className="max-w-6xl m-auto text-center ">
                <Navbar/>
                <HeroSection/>
                <Features/>
                <DemoVideo/>
        </div>
    </div>
  )
}

export default LandingPage