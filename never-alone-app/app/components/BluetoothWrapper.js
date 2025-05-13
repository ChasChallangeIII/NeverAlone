// App.js or AppWrapper.js

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connectToDevice, startDataListener, disconnectDevice, isDeviceConnected } from './app/services/bleService'; // Adjust path

const BluetoothWrapper = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [receivedData, setReceivedData] = useState('');
  const [error, setError] = useState(null);

  // Function to handle received data
  const handleDataReceived = useCallback((data, error) => {
    if (error) {
      setError(error.message);
      setReceivedData('Error'); // Or clear the data
      return;
    }
    if (data) {
      setReceivedData(data);
      if (data.includes('Short_Button_Press')) {
        triggerThirdFunction('short');
      } else if (data.includes('Long_Button_Press')) {
        triggerThirdFunction('long');
      }
    }
  }, []);

  // Function to connect and start listening
  const handleConnect = useCallback(async () => {
    if (isDeviceConnected()) {
      alert('Already connected to a device!');
      return;
    }
    setConnectionStatus('Connecting...');
    setError(null);
    try {
      await connectToDevice();
      setConnectionStatus('Connected');
      startDataListener(handleDataReceived); // Start listening *after* connecting
    } catch (err) {
      setConnectionStatus('Disconnected');
      setError(err.message);
      setReceivedData('');
    }
  }, [handleDataReceived]);


  // Function to disconnect
  const handleDisconnect = () => {
    disconnectDevice();
    setConnectionStatus('Disconnected');
    setReceivedData('');
  };

  // Placeholder for your third function -  Move this to bleService.js if you want
  const triggerThirdFunction = (signal) => {
    console.log('Third function triggered by:', signal);
    //  Call your third function/service here.
  };

  // Effect to handle disconnection on unmount.
  useEffect(() => {
    return () => {
      disconnectDevice(); // Clean up on component unmount
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Connection Status: {connectionStatus}</Text>
      <Text style={styles.data}>Received Data: {receivedData}</Text>
      {error && <Text style={styles.error}>Error: {error}</Text>}

      <Button
        title={connectionStatus === 'Disconnected' ? 'Connect' : 'Disconnect'}
        onPress={connectionStatus === 'Disconnected' ? handleConnect : handleDisconnect}
        disabled={connectionStatus === 'Connecting...'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black'
  },
  data: {
    fontSize: 16,
    marginBottom: 20,
    color: 'green'
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20
  }
});

export default BluetoothWrapper;