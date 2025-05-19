import * as SecureStore from "expo-secure-store";

export const getFromSecureStore = async (key) => {
  try {
    return await SecureStore.getItem(key);
  } catch (error) {
    console.log("Det gick inte att hämta ut token", error);
  }
};
export const saveToSecureStore = async (key, value) => {
  try {
     await SecureStore.setItem(key,value);
  } catch (error) {
    console.log("Det gick inte att spara token", error);
  }
};
export const deleteFromSecureStore = async (key) => {
  try {
     await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Det gick inte att radera token", error);
  }
};
