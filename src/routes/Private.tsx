import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface PrivateProps {
  children: ReactNode;
};

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [signed, setSigned] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user) {
        const userData = {
          uid: user?.uid,
          email: user?.email          
        }

        localStorage.setItem("@reactLinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    })

    return () => {
      unsub();
    };

  }, []);

  if(loading) {
    return <></>
  }

  if(!signed) {
    return <Navigate to="/login" />
  }

  return children;
};