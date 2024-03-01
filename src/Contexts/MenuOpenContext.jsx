import React, { createContext, useState, useContext } from 'react';

const MenuOpenContext = createContext()

const MenuOpenpRrovider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <MenuOpenContext.Provider value={{isOpen, setIsOpen, toggleMenu}}>
        {children}
    </MenuOpenContext.Provider>
  )
}

export const useMenuOpenContext = () => useContext(MenuOpenContext)

export default MenuOpenpRrovider