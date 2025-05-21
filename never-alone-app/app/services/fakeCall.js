const playRingtone = async () => {
    try {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DoNotMix,
            playsInSilentModeIOS: true, // 🔈 Viktigt
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
            playThroughEarpieceAndroid: false,
        });


        const { sound } = await Audio.Sound.createAsync(
            require("../assets/sounds/original-phone-ringtone-36558.mp3"),
            {
                isLooping: true,
                volume: 1.0,
                shouldPlay: true,
            }
        );
        ringtoneSound = sound
        await sound.playAsync()
    } catch (error) {
        console.log("❌ Failed to play ringtone:", error);
    }
}

 const stopRingtone = async () => {
    try {
        await ringtoneSound.stopAsync()
        await ringtoneSound.unloadAsync()
    } catch (error) {
        console.warn("⚠️ Failed to stop ringtone:", error);
    }
}