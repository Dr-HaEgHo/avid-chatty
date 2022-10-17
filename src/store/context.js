import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import db from "./server.config";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    const local_email = localStorage.getItem("Email");

    const userRef = doc(db, "users", local_email);
    await getDoc(userRef).then((document) => {
      console.log("Current User is >>>", document.data().fullname);
      console.log("Current User data is >>>", document.data());
      setCurrentUser(document.data());
    });
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        currentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
