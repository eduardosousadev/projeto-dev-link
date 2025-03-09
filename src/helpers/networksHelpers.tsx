import { Dispatch, FormEvent, SetStateAction } from "react"
import { Input } from "../components/Input/input";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

export const labelField = (
  label: string,
  setLabel: Dispatch<SetStateAction<string>>,
  title: string,
  placeholder: string
) => {
  return (
    <label className="w-full flex flex-col gap-2">
      <span className="text-white font-medium">{ title }</span>
      <Input 
        type="url"
        clean={ label }
        setClean={ setLabel }
        placeholder= { placeholder }
        value={ label }
        onChange={ (e) => setLabel(e.target.value) }
      />
    </label>
  )
};

export const handleRegister = (
  e: FormEvent<HTMLFormElement>,
  facebook: string,
  setFacebook: Dispatch<SetStateAction<string>>,
  instagram: string,
  setInstagram: Dispatch<SetStateAction<string>>,
  youtube: string,
  setYoutube: Dispatch<SetStateAction<string>>,
  twitter: string,
  setTwitter: Dispatch<SetStateAction<string>>,
  github: string,
  setGithub: Dispatch<SetStateAction<string>>,
  linkedin: string,
  setLinkedin: Dispatch<SetStateAction<string>>
) => {
  e.preventDefault();

  //criando uma collection com um novo e único documento dessa collection
  setDoc(doc(db, "social", "link"), {
    facebook: facebook,
    instagram: instagram,
    youtube: youtube,
    twitter: twitter,
    github: github,
    linkedin: linkedin,
  })
  .then(() => {
    console.info("*----------LINK REGISTRADO COM SUCESSO----------*");
    setFacebook('');
    setInstagram('');
    setYoutube('');
    setTwitter('');
    setGithub('');
    setLinkedin('');
  })
  .catch((error) => {
    console.error("*----------ERRO AO REGISTRAR LINK----------*");
    console.error(error);
  });
};