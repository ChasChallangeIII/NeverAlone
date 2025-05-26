

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const audioSource = require("../assets/sounds/original-phone-ringtone-36558.mp3");


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const sendCallNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Inkommande samtal",
      body: "Hubby ringer dig nu.",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: { seconds: 100 },
  });
};
