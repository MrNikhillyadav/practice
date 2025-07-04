import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const countStore = (set) => ({
    count : 0,
    increment : () => {
        set((state) => ({
            count : state.count + 1
        }))
    },
    decrement : () => {
        set((state) => ({
            count : state.count - 1
        }))
    }
})

const useCountStore = create (
    devtools (
        persist ( countStore, {
            name : "countStore"
        })
    )
)

export default useCountStore;
