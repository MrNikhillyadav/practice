interface InputInterface {
    placeholder : string,
    reference ? : any
}

export function Input({reference,placeholder}:InputInterface){
    return (
        <div className="flex w-full gap-2 flex-col">
            <input ref={reference} type="text" placeholder={placeholder}  className="rounded-md p-1 px-2 border-1 outline-none text-sm font-light border-[#3E3E3E] "/>
        </div>
    )
}