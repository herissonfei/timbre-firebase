import React, { createContext, useState } from "react";

export const RechercheContext = createContext();

export const RechercheProvider = ({ children }) => {
  const [isRechercheOpen, setIsRechercheOpen] = useState(false);

  const toggleRecherche = () => {
    // console.log("1");
    setIsRechercheOpen((prevState) => !prevState);
  };

  return (
    <RechercheContext.Provider value={{ isRechercheOpen, toggleRecherche }}>
      {children}
    </RechercheContext.Provider>
  );
};
