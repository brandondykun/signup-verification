import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const userContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const [contextUser, setContextUser] = useState("");
  const [contextPassword, setContextPassword] = useState("");

  return (
    <userContext.Provider
      value={{
        contextUser,
        setContextUser,
        contextPassword,
        setContextPassword,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const { contextUser, setContextUser, contextPassword, setContextPassword } =
    useContext(userContext);
  return { contextUser, setContextUser, contextPassword, setContextPassword };
};
