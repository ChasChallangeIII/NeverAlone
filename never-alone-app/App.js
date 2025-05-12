// app/screens/HomeScreen.jsx

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BluetoothWrapper from '../../BluetoothWrapper'; // Adjust path if needed

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <BluetoothWrapper />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});