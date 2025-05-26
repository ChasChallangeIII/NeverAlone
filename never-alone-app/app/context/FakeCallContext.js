import { createContext, useContext, useState } from "react";

const FakeCallContext = createContext();

export const FakeCallProvider = ({ children }) => {
  const [fakeCallData, setFakeCallData] = useState(null);
  const [fakeCallLocation, setFakeCallLocation] = useState(null);
   const [message, setMessage] = useState('')
    const [cause, setCause] = useState('')

    value = {
      fakeCallData,
      setFakeCallData,
      fakeCallLocation,
      setFakeCallLocation,
      message,
      setMessage,
      cause,
      setCause,
    };

  return (
    <FakeCallContext.Provider value={value}>
      {children}
    </FakeCallContext.Provider>
  );
};

export const useFakeCall = () => useContext(FakeCallContext);