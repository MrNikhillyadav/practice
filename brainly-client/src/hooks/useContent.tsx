import axios from "axios";
import { useEffect, useState } from "react";

export function useContent() {
    const [contents, setContents] = useState([]);

    async function refresh() {
        const res = await axios.get(`http://localhost:3000/api/v1/content/all-content`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })

        const content = res.data.content
        setContents(content)    
    }

    useEffect(() => {
        refresh()
        const interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return {contents, refresh};
}