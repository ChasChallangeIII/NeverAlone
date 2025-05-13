// app/services/bleService.js

import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { Platform } from 'react-native';

const bleManager = new BleManager();
const SERVICE_UUID = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E'; // Your ESP32 Service UUID
const CHARACTERISTIC_UUID = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E'; // Your ESP32 Characteristic UUID

let connectedDevice = null;
let dataListener = null; // To store the subscription

// Placeholder for your third function
const triggerThirdFunction = (signal) => {
  console.log('Third function triggered by:', signal);
  // In your actual app, this would call your third service/function
};

/**
 * Searches for and connects to a BLE device.
 * @param {string} deviceName - The name of the device to connect to.
 * @returns {Promise<void>}
 */
async function connectToDevice(deviceName = 'ESP32C3_Button') {
  try {
    console.log(`Searching for device: ${deviceName}`);
    const device = await bleManager.discoverDevice(deviceName); // Simplified
    if (!device) {
      throw new Error(`Device with name "${deviceName}" not found.`);
    }

    console.log('Device found. Connecting...');
    connectedDevice = await device.connect();
    console.log('Connected to device:', connectedDevice.name || connectedDevice.id);

    await connectedDevice.discoverAllServicesAndCharacteristics();
    console.log('Services and characteristics discovered.');

  } catch (error) {
    console.error('Error connecting to device:', error);
    connectedDevice = null; // Reset
    throw error; // Re-throw to be handled by caller
  }
}

/**
 * Sets up a listener for data from the specified characteristic.
 * @param {function} onDataReceived - Callback function to handle received data.
 */
function startDataListener(onDataReceived) {
  if (!connectedDevice) {
    const error = new Error('Not connected to a device.');
    console.error(error);
    throw error;
  }

  // Clear any existing listener
  if (dataListener) {
    dataListener.remove();
    dataListener = null;
  }

  dataListener = connectedDevice.monitorCharacteristicForService(
    SERVICE_UUID,
    CHARACTERISTIC_UUID,
    (error, characteristic) => {
      if (error) {
        console.error('Error receiving data:', error);
        onDataReceived(null, error); // Pass both null data and error
        return;
      }
      if (characteristic?.value) {
        try {
          const value = Buffer.from(characteristic.value, 'base64').toString('utf-8');
          console.log('Received data:', value);
          onDataReceived(value, null); // Pass data, no error
        } catch (e) {
          console.error("Error decoding data", e);
          onDataReceived(null, e);
        }
      }
    }
  );
}

function disconnectDevice() {
  if (connectedDevice) {
    connectedDevice.disconnect()
      .then(() => {
        console.log('Disconnected from device');
        connectedDevice = null;
        if (dataListener) {
          dataListener.remove();
          dataListener = null;
        }
      })
      .catch(error => {
        console.error("Error disconnecting", error);
      });
  } else {
    console.log('No device to disconnect from.');
  }
}

function isDeviceConnected() {
  return connectedDevice !== null;
}

export { connectToDevice, startDataListener, disconnectDevice, isDeviceConnected };