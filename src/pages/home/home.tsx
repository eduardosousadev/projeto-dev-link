import { FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Social } from "../../components/Social/social";
import { useLoadData } from "../../hooks/useLoadData";

export function Home() {
  const { links, socialLinks, isLoading } = useLoadData();

  const showSocialMediaLinks = (socialMediaLink: string) => {
    return { display: socialMediaLink ? "flex" : "none" };
  }

  if(isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold">Carregando...</h1>
      </div>
    )
  }

  return (
    <div className="w-full py-4 flex flex-col justify-center items-center">
      <h1 className="text-3xl text-white font-bold mt-20 md:text-4xl">
        Eduardo Sousa
      </h1>
      <span className="text-gray-50 mb-5 mt-3">
        { links.length > 0 ? "Veja meus links 👇" : "Nenhum link cadastrado" }
      </span>

      <main className="w-11/12 max-w-xl flex flex-col text-center">
        {links.map((link) => (
          <section 
            style={{ backgroundColor: link.background, color: link.color }}
            key={ link.id } 
            className={ `bg-white mb-4 w-full rounded-lg select-none transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center justify-center gap-2`}>
            <a className="w-full py-2" href={ link.url } target="_blank">
              <p className="text-base md:text-lg">
                { link.name }
              </p>
            </a>
          </section>
        ))}     
     
        {socialLinks && links.length > 0 && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social 
              style={ showSocialMediaLinks(socialLinks.facebook) } 
              url={ socialLinks.facebook }
            >
              <FaFacebook size={ 35 } />
            </Social>
            <Social 
              style={ showSocialMediaLinks(socialLinks.instagram) } 
              url={ socialLinks.instagram }
            >
              <FaInstagram size={ 35 } />
            </Social>
            <Social 
              style={ showSocialMediaLinks(socialLinks.youtube) }
              url={ socialLinks.youtube }
            >
              <FaYoutube size={ 35 } />
            </Social>
            <Social 
              style={ showSocialMediaLinks(socialLinks.twitter) }
              url={ socialLinks.twitter }
            >
              <FaTwitter size={ 35 } />
            </Social>
            <Social 
              style={ showSocialMediaLinks(socialLinks.github) }
              url={ socialLinks.github }
            >
              <FaGithub size={ 35 } />
            </Social>
            <Social 
              style={ showSocialMediaLinks(socialLinks.linkedin) }
              url={ socialLinks.linkedin }
            >
              <FaLinkedin size={ 35 } />
            </Social>
          </footer>
        )}
      </main>
    </div>
  )
}