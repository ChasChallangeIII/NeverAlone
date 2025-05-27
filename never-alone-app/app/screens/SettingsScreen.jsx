import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import BigText from "../components/textwrappers/BigText";
import { Pressable, TextInput, View, StyleSheet, Platform, Switch, TouchableOpacity, Text } from "react-native";
import MyText from "../components/textwrappers/MyText";
import AntDesign from '@expo/vector-icons/AntDesign';
import DeviceModal from "../components/DeviceConnectionModal";
import useBLE from "../hooks/useBLE";
import React, { useState } from "react";

const SettingsScreen = ({ navigation }) => {
  const { customTheme, toggleTheme, isDark } = useTheme();
  const { clearUser } = useUser();
  const { logOut } = useAuth();

  const [isBLEModalVisible, setIsBLEModalVisible] = useState(false);

  const {
    allDevices,
    connectedDevice,
    connectToDevice,
    requestPermissions,
    scanForPeripherals
  } = useBLE();

  const handleSignOut = async () => {
    clearUser();
    logOut();
  };

  const openBLEModal = async () => {
    const granted = await requestPermissions();
    if (granted) {
      scanForPeripherals();
      setIsBLEModalVisible(true);
    }
  };

  const closeBLEModal = () => setIsBLEModalVisible(false);

  const styles = createStyles(customTheme, isDark);

  const onClose = () => navigation.goBack();

  return (
    <View style={styles.background}>
      <BigText>Inställningar</BigText>

      <View style={styles.switchContainer}>
        <MyText>Mörktläge</MyText>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{
            false: 'default',
            true: customTheme.colors.primary
          }}
          thumbColor={
            isDark && Platform.OS === 'ios'
              ? customTheme.colors.primary100
              : isDark && Platform.OS === 'android'
                ? customTheme.colors.primary900
                : customTheme.colors.primary500
          }
        />
      </View>

      {/* Bluetooth Button */}
      <TouchableOpacity style={styles.bleButton} onPress={openBLEModal}>
        <MyText>Bluetooth-inställningar</MyText>
        <Text style={styles.bleStatusText}>
          {connectedDevice ? '🔵 Ansluten' : '⚪️ Ej ansluten'}
        </Text>
      </TouchableOpacity>

      <Pressable style={styles.signoutButton} onPress={handleSignOut}>
        <MyText>Logga ut</MyText>
      </Pressable>

      <Pressable style={styles.close} onPress={onClose}>
        <AntDesign style={styles.closeIcon} name='back' />
      </Pressable>

      <DeviceModal
        closeModal={closeBLEModal}
        visible={isBLEModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </View>
  );
};

export default SettingsScreen;

const createStyles = (theme, isDark) => StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
    resizeMode: 'cover'
  },
  background: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: 20,
    paddingBlockEnd: Platform.OS === 'android' ? 20 : 70,
    gap: 20
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    width: 90,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.text
  },
  settingsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  close: {
    position: 'absolute',
    right: 0,
    padding: 20
  },
  closeIcon: {
    color: theme.colors.text,
    fontSize: 24
  },
  signoutButton: {
    marginTop: 'auto',
    padding: 10,
    borderRadius: 30,
    backgroundColor: isDark ? theme.colors.secondary100 : theme.colors.secondary400,
    alignItems: 'center',
    width: 100
  },
  bleButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.text,
    alignItems: 'center'
  },
  bleStatusText: {
    color: theme.colors.text,
    marginTop: 5
  }
});
