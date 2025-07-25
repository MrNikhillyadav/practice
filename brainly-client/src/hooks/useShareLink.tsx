import axios from "axios";
import { useState, useCallback, useRef } from "react";

export function useShareLink(){
    const [link, setLink] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const timeoutRef = useRef< number| null>(null)
    
    const getShareLink = useCallback(async () => {
        if (isLoading) return; 
        
        try {
            console.log("inside generateSharelink function")
            setIsLoading(true)
            setIsCopied(false)
            
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            const res = await axios.post("http://localhost:3000/api/v1/brain/share",{
                    share : true
                },
                {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")} `
                    }
                } 
            )

            const hash = res.data.existingHash[0].hash;
            const hashLink =`http://localhost:3000/api/v1/brain/share/${hash}`
            console.log('hashLink: ', hashLink);
    
            setLink(hashLink)
            
            await navigator.clipboard.writeText(hashLink)
            setIsCopied(true)
            
            timeoutRef.current = setTimeout(() => {
                setIsCopied(false)
            }, 3000)
            
        } catch (error) {
            console.error("Error generating share link:", error)
            setIsCopied(false)
        } finally {
            setIsLoading(false)
        }
    }, [isLoading])
  
    return { link, getShareLink, isLoading, isCopied }
}