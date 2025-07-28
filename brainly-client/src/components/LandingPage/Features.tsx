import { Clock, Sparkles, Zap } from 'lucide-react'

const Features = () => {
  return (
    <div className='bg-gradient-to-r from-[#131314] shadow-sm via-[#171717] to-[#131314] rounded-lg bg-[#191919] mt-8'>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-6">
          <div className="flex items-start space-x-3 text-gray-300 max-w-xs">
            <Zap className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
            <span className="text-sm font-normal leading-relaxed">Save tweets and videos with one click</span>
          </div>
          <div className="flex items-start space-x-3 text-gray-300 max-w-xs">
            <Clock className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
            <span className="text-sm font-normal leading-relaxed">Access your saved content instantly</span>
          </div>
          <div className="flex items-start space-x-3 text-gray-300 max-w-xs">
            <Sparkles className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
            <span className="text-sm font-normal leading-relaxed">Smart organization with AI tagging</span>
          </div>

        </div>
    </div>
  )
}

export default Features