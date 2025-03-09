import { InputHTMLAttributes, Dispatch, SetStateAction } from "react"
import { IoIosClose } from "react-icons/io";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  clean: string;
  setClean: Dispatch<SetStateAction<string>>
}

export function Input({ clean, setClean, ...props }: InputProps, ) {
  const handleCleanField = () => {
    setClean("");
  }
  return (
    <div className="relative">
      <IoIosClose 
        onClick={ handleCleanField }
        size={ 20 }
        className={`absolute right-1 top-1 cursor-pointer duration-500 rounded-full hover:bg-black hover:text-white ${clean !== '' ? 'block' : 'hidden'}`}
      />
      <input 
        className="w-full border-0 h-9 rounded-md outline-none px-2 mb-3"
        {...props}
      />
    </div>
  )
}