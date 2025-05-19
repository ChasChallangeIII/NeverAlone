/* eslint-disable no-bitwise */
import { useMemo, useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import * as ExpoDevice from 'expo-device';
import base64 from 'react-native-base64';
import { BleManager } from 'react-native-ble-plx';
import { useCallUI } from '../context/CallUIContext'; //  Make sure the path is correct

const DATA_SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
const COLOR_CHARACTERISTIC_UUID = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";

const bleManager = new BleManager();

export default function useBLE() {
  const [allDevices, setAllDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [color, setColor] = useState('white');

  const { triggerCall } = useCallUI(); //  Used to trigger the fake call modal

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK',
      }
    );

    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK',
      }
    );

    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK',
      }
    );

    // Return true only if all permissions were granted
    return (
      bluetoothScanPermission === 'granted' &&
      bluetoothConnectPermission === 'granted' &&
      fineLocationPermission === 'granted'
    );
  };

  // Handle permission requests depending on Android version
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const apiLevel = ExpoDevice.platformApiLevel ?? -1;
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return await requestAndroid31Permissions();
      }
    } else {
      return true;
    }
  };

  // Helper function to avoid adding duplicate devices to the list
  const isDuplicateDevice = (devices, nextDevice) => {
    return devices.findIndex(device => nextDevice.id === device.id) > -1;
  };

  // Start scanning for BLE peripherals
  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }

      // Filter devices by expected name
      if (device && (device.localName === 'ESP32C3_Button' || device.name === 'ESP32C3_Button')) {
        console.log("Device found:", device.name || device.localName); 
        bleManager.stopDeviceScan(); // Stop scanning to save battery

        // Add the device if it's not already in the list
        setAllDevices(prevDevices => {
          if (!isDuplicateDevice(prevDevices, device)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });
  };

// Connect to the selected BLE device and start listening for data
  const connectToDevice = async (device) => {
    try {
      const connectedDevice = await device.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connectedDevice);

      connectedDevice.monitorCharacteristicForService(
        DATA_SERVICE_UUID,
        COLOR_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error('Notification error:', error);
            return;
          }

          if (characteristic?.value) {
            const decoded = base64.decode(characteristic.value);
            console.log('📬 Received from ESP32:', decoded);

            // Trigger fake call modal
            triggerCall();
          }
        }
      );
    } catch (error) {
      console.error('Connection failed', error);
    }
  };

  // Callback function for incoming data notifications from the BLE device
  const onDataUpdate = (error, characteristic) => {
    if (error) {
      console.log("BLE Error:", error);
      return;
    }

  if (!characteristic?.value) {
    console.log("No value received from characteristic.");
    return;
  }

  // Decode base64 string into UTF-8 text and update state
  const decoded = base64.decode(characteristic.value);
  console.log("Received from ESP32:", decoded);
  setColor(decoded); // You can rename setColor to setMessage or similar
};

   /* const decoded = base64.decode(characteristic.value);
    console.log("Received from ESP32:", decoded);
    setColor(decoded); // optional or rename to setMessage()
  }; */

  const startStreamingData = async (device) => {
    if (device) {
      device.monitorCharacteristicForService(
        DATA_SERVICE_UUID,
        COLOR_CHARACTERISTIC_UUID,
        onDataUpdate
      );
    } else {
      console.log('No Device Connected');
    }
  };

  return {
    connectToDevice,
    allDevices,
    connectedDevice,
    color,
    requestPermissions,
    scanForPeripherals,
    startStreamingData,
  };
}
