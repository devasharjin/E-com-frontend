import { Loader2, Loader2Icon, LucideLoader } from "lucide-react"



const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <span>
            <Loader2Icon className="transition-transform animate-spin"/>
        </span>
        
    </div>
  )
}

export default Loader