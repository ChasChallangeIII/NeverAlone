// context/CallUIContext.js
import React, { createContext, useContext, useState } from 'react';

const CallUIContext = createContext();

export const useCallUI = () => useContext(CallUIContext);

export const CallUIProvider = ({ children }) => {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <CallUIContext.Provider value={{ isModalShown, setIsModalShown }}>
      {children}
    </CallUIContext.Provider>
  );
};
