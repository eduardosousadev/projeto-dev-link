import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { Dispatch, FormEvent, SetStateAction } from "react";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../services/firebaseConnection";
import { successMsg } from "./generalHelpers";
import { LinkProps } from "../types/types";

const cleanInputs = (
  setNameInput: Dispatch<SetStateAction<string>>,
  setUrlInput: Dispatch<SetStateAction<string>>,
  setTextColorInput: Dispatch<SetStateAction<string>>,
  setBackgroundColorInput: Dispatch<SetStateAction<string>>
) => {
  setNameInput('');
  setUrlInput('');
  setTimeout(() => {
    setTextColorInput('#f1f1f1');
    setBackgroundColorInput('#121212');
  }, 500);
};

export const handleRegister = async (
  e: FormEvent<HTMLFormElement>,
  editingLinkId: string | null,
  nameInput: string,
  urlInput: string,
  backgroundColorInput: string,
  textColorInput: string,

  setNameInput: Dispatch<SetStateAction<string>>,
  setUrlInput: Dispatch<SetStateAction<string>>,
  setTextColorInput: Dispatch<SetStateAction<string>>,
  setBackgroundColorInput: Dispatch<SetStateAction<string>>,

  setIsDisabledInput: Dispatch<SetStateAction<boolean>>,

  setEditingLinkId: Dispatch<SetStateAction<string | null>>,

  setIsUpdate: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();

  if(editingLinkId) {
    const linkRef = doc(db, "links", editingLinkId);
    await updateDoc(linkRef, {
      name: nameInput,
      url: urlInput,
      background: backgroundColorInput,
      color: textColorInput
    })
    .then(() => {
      successMsg('Link atualizado com sucesso!');
      cleanInputs(
        setNameInput,
        setUrlInput,
        setTextColorInput,
        setBackgroundColorInput
      );
      setEditingLinkId(null);
      setTimeout(() => {
        setIsUpdate(false);
      }, 500)
    })
  } else {
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      background: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
    .then(() => {
      cleanInputs(
        setNameInput,
        setUrlInput,
        setTextColorInput,
        setBackgroundColorInput
      );
      setIsDisabledInput(true);
      successMsg('Link registrado com sucesso!');
    })
    .catch((error) => {
      console.error("*----------DEU ERRO----------*");
      console.error("DETALHES: ", error);
    });
  }
}

export const handleDeleteLink = async (
  id: string,
  setLinks: Dispatch<SetStateAction<LinkProps[]>>
) => {
  try {
    const linkRef = doc(db, "links", id);
    await deleteDoc(linkRef);

    // Atualiza o estado localmente
    setLinks((prevLinks) => prevLinks.filter(link => link.id !== id));
    successMsg('Link deletado com sucesso!');
  } catch (error) {
    console.error("Erro ao deletar link:", error);
  }
};

export const handleEditLink = async (
  id: string,
  setNameInput: Dispatch<SetStateAction<string>>,
  setUrlInput: Dispatch<SetStateAction<string>>,
  setTextColorInput: Dispatch<SetStateAction<string>>,
  setBackgroundColorInput: Dispatch<SetStateAction<string>>,
  setIsUpdate: Dispatch<SetStateAction<boolean>>,
  setEditingLinkId: Dispatch<SetStateAction<string | null>>
) => {
  const linkRef = doc(db, "links", id);
  const docRef = await getDoc(linkRef);
  if(docRef.exists()) {
    const data = docRef.data();
    setNameInput(data.name);
    setUrlInput(data.url);
    setTextColorInput(data.color);
    setBackgroundColorInput(data.background);
    setEditingLinkId(id);
    setIsUpdate(true);
  }      
}