import axios from "axios";
import { useEffect, useState } from "react";

export function useContent() {
    const [contents, setContents] = useState([]);

    async function refresh() {
        const res = axios.get(`http://localhost:3000/api/v1/content`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })

        
            .then((response) => {
                setContents(response.data.content)
            })
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