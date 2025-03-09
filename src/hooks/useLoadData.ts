import { useEffect, useState } from "react";
import { LinkProps, SocialLinksProps } from "../types/types";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

export function useLoadData() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));
        const linksSnapshot = getDocs(queryRef);

        const docRef = doc(db, "social", "link");
        const socialSnapshot = getDoc(docRef);
        
        // Espera ambas as requisições terminarem
        const [linksResult, socialResult] = await Promise.all([linksSnapshot, socialSnapshot]);
        
        let list: LinkProps[] = [];
        linksResult.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            name: data.name,
            url: data.url,
            background: data.background,
            color: data.color,
          })
        });
        setLinks(list);

        if(socialResult.exists()) {
          setSocialLinks(socialResult.data() as SocialLinksProps);
        };

      } catch (error) {
        console.log("ERRO AO CARREGAR OS DADOS: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return {
    links, setLinks,
    socialLinks, setSocialLinks,
    isLoading, setIsLoading
  }
}