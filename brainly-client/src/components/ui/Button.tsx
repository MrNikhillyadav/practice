import { type JSX } from "react";

interface ButtonInterface{
  title : string;
  variant? : 'primary',
  startIcon?: JSX.Element,
  onClick?: () => void;
}

const defaultStyle = " text-white rounded-md bg-[#252525] text-sm px-2 py-1 drop-shadow-md cursor-pointer "

const ButtonVariants = {
  "primary" : '',
}

export  function Button(props : ButtonInterface){ 
  return (
    <button  onClick={props.onClick} className={` ${defaultStyle} flex  items-center justify-center ${ButtonVariants[props.variant]} `}>
      {props.startIcon}
      <span  className="pl-2 pr-2">
          {props.title}
      </span>
    </button>
  )
}
