import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
    const [isLightMode, setIsLightMode] = useState(() => {
        const storedLightMode = localStorage.getItem('lightMode');
        return storedLightMode ? JSON.parse(storedLightMode) : false;
    });

    const toggleTheme = () => {
        setIsLightMode((prevMode) => {
            const currentMode = !prevMode;
            localStorage.setItem('lightMode', JSON.stringify(currentMode));
            return currentMode;
        });
    };

    useEffect(() => {
        const root = document.documentElement;
        if (isLightMode) {
            root.classList.add('light');
        } else {
            root.classList.remove('light');
        }
    }, [isLightMode]);

    return (
        <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContextProvider;
