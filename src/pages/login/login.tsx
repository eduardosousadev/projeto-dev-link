import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/input";
import { FormEvent, useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(email === '' || password === '') {
      alert("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("LOGADO COM SUCESSO!");
      navigate("/admin", { replace: true })

    })
    .catch((error) => {
      console.error("ERRO AO FAZER O LOGIN: ", error);
    })
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
        <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>
      </Link>

      <form 
        className="w-full max-w-xl flex flex-col px-2"
        onSubmit={ handleSubmit }
      >
        <Input 
          type="email"
          placeholder="Digite o seu email..."
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          clean={ email }
          setClean={ setEmail }
        />

        <Input 
          type="password"
          placeholder="**********"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          clean={ password }
          setClean={ setPassword }
        />

        <button 
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white">
          Acessar
        </button>
      </form>
    </div>
  )
}