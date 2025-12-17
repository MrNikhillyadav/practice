import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useState, useCallback, useRef } from "react";
import { toast } from 'sonner'

export function useShareLink(){
    const [isLoading, setIsLoading] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const timeoutRef = useRef<number| null>(null)
    
    const getShareLink = useCallback(async () => {
        if (isLoading) return; 
        const loadId = toast.loading('generating ...')
        
        try {
            console.log("inside generateSharelink function")
            setIsLoading(true)
            setIsCopied(false)
            
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            
            const res = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                    share : true
                },
                {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")} `
                    }
                } 
            )

            const hash = res.data.existingHash[0].hash;
            const hashLink =`${BACKEND_URL}/api/v1/brain/share/${hash}`
            console.log('hashLink: ', hashLink);
    
            
            await navigator.clipboard.writeText(hashLink)
            setIsCopied(true)

            
            timeoutRef.current = window.setTimeout(() => {
                setIsCopied(false)
            }, 3000)
            
            if (res.status === 200) {
               
               toast.success(`link copied to clipboard! `)
               toast.dismiss(loadId)
               return;
           } 
           
        } catch (error) {
            console.error("Error generating share link:", error)
            setIsCopied(false)
        } finally {
            setIsLoading(false)
        }
    }, [isLoading])
  
    return { getShareLink, isLoading, isCopied }
}