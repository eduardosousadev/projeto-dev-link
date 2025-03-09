import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-4 text-white relative">
        <span className="text-4xl font-bold">404</span>
        <div className="w-[2px] h-[80px] bg-white"></div>
        <span className="text-2xl">Página não encontrada!</span>
        <Link 
          to="/" 
          className="text-xs text-white absolute bottom-0 right-0 cursor-pointer transition duration-500 hover:text-blue-500 italic"
        >
          Voltar para a página inicial.
        </Link>
      </div>
    </div>
  )
}