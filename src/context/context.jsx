'use client';
import { createContext, useContext, useState } from 'react';

export const Context = createContext();

export const AppProvider = ({ children }) => {
  const [isnavbar, setisnavbar] = useState(false);
  const [toggleAuth, settoggleAuth] = useState('register');
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
