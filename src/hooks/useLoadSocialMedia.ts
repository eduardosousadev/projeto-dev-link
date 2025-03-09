import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConnection";

export function useLoadSocialMedia() {
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef)
      .then((snapshot)=> {
        if(snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
          setTwitter(snapshot.data()?.twitter);
          setGithub(snapshot.data()?.github);
          setLinkedin(snapshot.data()?.linkedin);
        }
      })
    }

    loadLinks();
  }, []);

  return {
    facebook, setFacebook,
    instagram, setInstagram,
    youtube, setYoutube,
    twitter, setTwitter,
    github, setGithub,
    linkedin, setLinkedin
  }
}