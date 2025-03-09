import { useState, useEffect } from "react";
import { Header } from "../../components/Header/header";
import { Input } from "../../components/Input/input";
import { FiTrash, FiEdit2 } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import { collection, onSnapshot, query, orderBy } from  "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleDeleteLink, handleEditLink, handleRegister } from "../../helpers/adminHelpers";
import { LinkProps } from "../../types/types";

export function Admin() {
  const [nameInput, setNameInput] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [textColorInput, setTextColorInput] = useState<string>("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState<string>("#121212");
  const [isDisabledInput, setIsDisabledInput] = useState<boolean>(true);
  const showPreviewField = nameInput !== '' ? 'opacity-100' : 'opacity-0';
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  

  useEffect(() => {
    if(nameInput === '') {
      setTimeout(() => {
        setTextColorInput('#f1f1f1');
        setBackgroundColorInput('#121212');
      }, 500)
    }
  }, [nameInput]);

  useEffect(() => {
    if(nameInput !== '' && urlInput !== '') {
      setIsDisabledInput(false);
    } else {
      setIsDisabledInput(true);
    }
  }, [nameInput, urlInput]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let list = [] as LinkProps[];
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          background: doc.data().background,
          color: doc.data().color
        });
        setLinks(list);
      })
    })

    return () => {
      unsub();
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />
      
      <form 
        className="flex flex-col mt-8 mb-3 px-1 w-full max-w-xl" 
        onSubmit={ (e) => handleRegister(e, editingLinkId, nameInput, urlInput, backgroundColorInput, textColorInput, setNameInput, setUrlInput, setTextColorInput, setBackgroundColorInput, setIsDisabledInput, setEditingLinkId, setIsUpdate) }
      >
        <label className="text-white font-medium my-2">Nome do Link</label>
        <Input
          clean={ nameInput }
          setClean={ setNameInput }
          placeholder="Digite o nome do link..."
          value={ nameInput }
          onChange={ (e) => setNameInput(e.target.value) }
        />

        <label className="text-white font-medium my-2">Url do Link</label>
        <Input
          clean={ urlInput }
          setClean={ setUrlInput }
          type="url"
          placeholder="Digite a url..."
          value={ urlInput }
          onChange={ (e) => setUrlInput(e.target.value) }
        />

        <div className={ `transition-opacity duration-500 ${ showPreviewField }` }>
          <section className="flex my-4 gap-5">
            <div className=" flex items-center gap-2">
              <label className="text-white font-medium my-2">Cor do Link</label>
              <input 
                className="w-6 h-6"
                type="color" 
                value={ textColorInput }
                onChange={ (e) => setTextColorInput(e.target.value) }
              />
            </div>
            <div className=" flex items-center gap-2">
              <label className="text-white font-medium my-2">Fundo do Link</label>
              <input 
                className="w-6 h-6"
                type="color" 
                value={ backgroundColorInput }
                onChange={ (e) => setBackgroundColorInput(e.target.value) }
              />
            </div>
          </section>

          <div className="flex flex-col justify-center items-center p-1 border border-gray-100/25 rounded-md">
            <label className="text-white font-medium my-2">Veja como está ficando:</label>
            <article 
              className="w-11/12 max-w-lg flex flex-col justify-between items-center bg-zinc-900 rounded px-1 py-3 mb-2"
              style={{ color: textColorInput ,backgroundColor: backgroundColorInput }}
            >
              <p className="font-medium h-6">{ nameInput }</p>
            </article>
          </div> 

          <button 
            type="submit"
            className="w-full bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center my-7 transition duration-300 hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={ isDisabledInput }
          >
            { isUpdate ? 'Atualizar' : 'Cadastrar' }
          </button>
        </div>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

      { links.map((link) => (
        <article 
          key={ link.id }
          className="w-11/12 max-w-xl flex justify-between items-center rounded px-2 py-3 mb-2 select-none" 
          style={{ backgroundColor: link.background, color: link.color }}
        >
          <p>{ link.name }</p>
          <div 
            className="flex gap-2"
            >
            <button 
              onClick={() => handleEditLink(link.id, setNameInput, setUrlInput, setTextColorInput, setBackgroundColorInput, setIsUpdate, setEditingLinkId) }
              className="flex items-center border border-dashed p-1 rounded transition duration-300 hover:bg-black hover:text-red-500"
              title="Editar link."
            >
              <FiEdit2 size={ 18 } />
            </button>
            <button 
              onClick={ () => handleDeleteLink(link.id, setLinks)}
              className="flex items-center border border-dashed p-1 rounded transition duration-300 hover:bg-black hover:text-red-500"
              title="Deletar link."
            >
              <FiTrash size={ 18 } />
            </button>
          </div>
        </article>
      ))}
      <ToastContainer />
    </div>
  )
}