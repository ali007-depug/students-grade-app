import { useRef } from "react"

export default function Input({type,id,value,onChange,error,errorMsg,label,customStyle,children}){
const inputRef = useRef(null);

function handelLabelClick() {
    inputRef.current.focus();
  }
    return(
        <div className="relative flex flex-col items-center">
          <input
            type={type}
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            name={id}
            id={id}
            placeholder=" "
            required
            className={`h-10 bg-white text-title-color font-bold w-full rounded px-2 peer placeholder-transparent outline-2 outline-gray-600 user-invalid:outline-red-600 user-valid:outline-green-400 text-center ${customStyle}`}
          />
          <label
            htmlFor={id}
            onClick={handelLabelClick}
            className="relative top-[-55px] text-base cursor-text text-title-color bg-white transition-all duration-300 ease-in-out  peer-focus:text-sm  peer-focus:top-[-55px] peer-focus:bg-white peer-placeholder-shown:bg-transparent peer-placeholder-shown:top-[-32px]"
          >
            {label}
          </label>
          {error === false && (
            <p className="text-red-500">{errorMsg}</p>
          )}
          {children}
        </div>
    )
}