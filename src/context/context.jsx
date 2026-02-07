'use client';
import { createContext, useContext, useEffect, useState } from 'react';
export const Context = createContext();

export const AppProvider = ({ children }) => {
  const [isnavbar, setisnavbar] = useState(false);
  const [toggleAuth, settoggleAuth] = useState('register');
  const [isAuth, setisAuth] = useState(false);
  const name = 'asd';



  const value = {
    toggleAuth,
    settoggleAuth,
  };

  return (
    <Context.Provider
      value={{
        toggleAuth,
        settoggleAuth,
        isAuth,
        setisAuth,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
