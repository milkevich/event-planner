import React, { createContext, useState, useContext } from 'react';

const ColorTypeContext = createContext();

export const useColorTypeContext = () => useContext(ColorTypeContext);

export const ColorTypeProvider = ({ children }) => {
  const [selectedColorType, setSelectedColorType] = useState(null);

  console.log(selectedColorType)

  return (
    <ColorTypeContext.Provider value={{ selectedColorType, setSelectedColorType }}>
      {children}
    </ColorTypeContext.Provider>
  );
};

export default ColorTypeProvider