import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { jest } from "@jest/globals";
import { NativeModules } from "react-native";

// Mock AsyncStorage globaly
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// Mock AccessibilityInfo globaly
jest.mock(
  "react-native/Libraries/Components/AccessibilityInfo/AccessibilityInfo",
  () => ({
    announceForAccessibility: jest.fn(),
  })
);
