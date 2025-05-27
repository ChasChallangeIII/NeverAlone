import { createContext, useContext, useState } from "react";
import * as Location from "expo-location";

const FakeCallContext = createContext();

export const FakeCallProvider = ({ children }) => {
  const [fakeCallData, setFakeCallData] = useState(null);
  const [fakeCallLatitude, setFakeCallLatitude] = useState(null);
  const [fakeCallLongitude, setFakeCallLongitude] = useState(null);
  const [message, setMessage] = useState("");
  const [cause, setCause] = useState("");
  const [feedback, setFeedback] = useState(false);
  const [reportNotification, setReportNotification] = useState(false);

  const saveLocationAndTime = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert(status);
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const {
        coords: { latitude, longitude },
        timestamp,
      } = location;

      const isoTimeStamp = new Date(timestamp).toISOString();
      setFakeCallLatitude(latitude);
      setFakeCallLongitude(longitude);
    } catch (error) {
      console.warn(error);
    }
  };
  const sendReportNotification = async () => {
    setTimeout(() => {
      setReportNotification(true);
    }, 3000);
  };

  const handleFakeCall = (navigation) => {
    sendReportNotification();
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
    }, 2000);
    setTimeout(() => {
      navigation.navigate("IncomingCallScreen");
      saveLocationAndTime();
    }, 4000);
  };

  const value = {
    fakeCallData,
    setFakeCallData,
    fakeCallLatitude,
    setFakeCallLatitude,
    fakeCallLongitude,
    setFakeCallLongitude,
    message,
    setMessage,
    cause,
    setCause,
    feedback,
    saveLocationAndTime,
    handleFakeCall,
    reportNotification,
    setReportNotification,
  };

  return (
    <FakeCallContext.Provider value={value}>
      {children}
    </FakeCallContext.Provider>
  );
};

export const useFakeCall = () => useContext(FakeCallContext);
