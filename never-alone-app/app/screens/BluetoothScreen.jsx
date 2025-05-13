import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, PermissionsAndroid, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";

const SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
const CHARACTERISTIC_UUID = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";

const BluetoothScreen = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [message, setMessage] = useState("");
  const bleManager = new BleManager();

  // Begär behörighet för Android
  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    }

    const subscription = bleManager.onStateChange((state) => {
      if (state === "PoweredOn") {
        scanForDevices();
        subscription.remove();
      }
    }, true);

    return () => bleManager.destroy();
  }, []);

  // Skanna efter enheter
  const scanForDevices = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.warn("Scan error:", error);
        return;
      }

      if (device && device.name?.includes("ESP32")) {
        setDevices((prev) => {
          const exists = prev.find((d) => d.id === device.id);
          return exists ? prev : [...prev, device];
        });
      }
    });

    // Stoppa skanningen efter 10 sekunder
    setTimeout(() => {
      bleManager.stopDeviceScan();
    }, 10000);
  };

  // Koppla upp till enheten
  const connectToDevice = async (device) => {
    try {
      const connectedDevice = await bleManager.connectToDevice(device.id);
      await connectedDevice.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connectedDevice);
      console.log("Connected to", device.name);
      // Hämta notifieringar för den specifika karaktäristiken
      connectedDevice.monitorCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_UUID, (error, characteristic) => {
        if (error) {
          console.warn("Error monitoring characteristic:", error);
          return;
        }
        const message = characteristic.value ? characteristic.value.toString() : "No message received";
        setMessage(message); // Uppdatera meddelandet från BLE-enheten
      });
    } catch (error) {
      console.warn("Connection error:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Tillgängliga enheter:</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.name}</Text>
            <Text>{item.id}</Text>
            <Button title="Connect" onPress={() => connectToDevice(item)} />
          </View>
        )}
      />
      {connectedDevice && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Ansluten till: {connectedDevice.name}</Text>
          <Text>Meddelande: {message}</Text>
        </View>
      )}
    </View>
  );
};

export default BluetoothScreen;
