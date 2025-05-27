import React, { createContext, useContext, useState } from 'react';

const CallUIContext = createContext();

export const useCallUI = () => useContext(CallUIContext);

export const CallUIProvider = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState(false);

  const triggerCall = () => {
    setIsModalShown(true);
  };

  return (
    <CallUIContext.Provider value={{ isModalShown, setIsModalShown, triggerCall }}>
      {children}
    </CallUIContext.Provider>
  );
};