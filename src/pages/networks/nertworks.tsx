import { Header } from "../../components/Header/header";
import { handleRegister, labelField } from "../../helpers/networksHelpers";
import { useLoadSocialMedia } from "../../hooks/useLoadSocialMedia";

export function Networks() {
  const {
    facebook, setFacebook,
    instagram, setInstagram,
    youtube, setYoutube,
    twitter, setTwitter,
    github, setGithub,
    linkedin, setLinkedin
  } = useLoadSocialMedia();

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-white font-medium text-2xl mt-8 mb-4">Minhas redes sociais</h1>

      <form className="flex flex-col max-w-xl w-full" 
        onSubmit={ (e) => handleRegister(
          e, facebook, setFacebook,
          instagram, setInstagram,
          youtube, setYoutube,
          twitter, setTwitter,
          github, setGithub,
          linkedin, setLinkedin
        ) }
      >
        { labelField(facebook, setFacebook, "Link do facebook", "Digite a url do facebook...") }
        { labelField(instagram, setInstagram, "Link do instagram", "Digite a url do instagram...") }
        { labelField(youtube, setYoutube, "Link do youtube", "Digite a url do youtube...") }
        { labelField(twitter, setTwitter, "Link do twitter", "Digite a url do twitter...") }
        { labelField(github, setGithub, "Link do github", "Digite a url do github...") }
        { labelField(linkedin, setLinkedin, "Link do linkedin", "Digite a url do linkedin...") }
        <button type="submit" className="text-white bg-blue-600 h-9 rounded-md flex justify-center items-center my-7 font-medium">Salvar links</button>
      </form>
    </div>
  )
}