import { useEffect, useState } from "react";
import axios from "axios";

export function useContent() {
    const [contents, setContents] = useState([]);

    async function refresh() {
        const res = await axios.get(`http://localhost:3000/api/v1/content/all-content`, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        setContents(res.data.contents)    
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