import axios from "axios";

export const getLocation = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    if (!response.data || !response.data.address) {
      return null;
    }

    const address = response.data.address;

    return address.city || address.town || address.village;
  } catch {
    return null;
  }
};
