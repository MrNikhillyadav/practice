import { type JSX } from "react";

interface ButtonInterface{
  title : string;
  variant? : 'primary'|'secondary',
  startIcon?: JSX.Element,
  className ? : string,
  onClick?: () => void;
}

const defaultStyle = " rounded-md bg-[#252525] text-sm px-2 py-1 drop-shadow-md cursor-pointer "

const ButtonVariants = {
  "primary" : 'bg-white text-black hover:bg-white/85',
  "secondary" : 'bg-[#878787] text-black',
}

export  function Button(props : ButtonInterface){ 
    const variantStyle = props.variant ? ButtonVariants[props.variant] : "" ;

  return (
    <button  onClick={props.onClick} className={` ${defaultStyle} ${props.className} flex  items-center justify-center ${variantStyle} `}>
      {props.startIcon}
      <span  className="pl-2 pr-2">
          {props.title}
      </span>
    </button>
  )
}
