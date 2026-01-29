'use client';
import { createContext, useContext, useState } from 'react';

export const Context = createContext();

export const AppProvider = ({ children }) => {
  const [isnavbar, setisnavbar] = useState(false);
  const name = 'asd';

  return <Context.Provider value={{ name }}>{children}</Context.Provider>;
};

export const useAppContext = () => useContext(Context);
