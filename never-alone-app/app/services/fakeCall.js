export const handleFakeCall = () => {
  alert("Fake samta på g");
//   alertLocation();
};
export const alertLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert(status);
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location;

    alert(latitude);
  } catch (error) {
    alert(error);
  }
};