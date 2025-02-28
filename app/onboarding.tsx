import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
// import * as IntentLauncher from "expo-intent-launcher";

const openWiFiSettings = () => {
  if (Platform.OS === "ios") {
    // Direct Wi-Fi settings for iOS (only works in standalone apps)
    Linking.openURL("App-Prefs:WIFI");
  } else if (Platform.OS === "android") {
    // Direct Wi-Fi settings for Android
    // IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.WIFI_SETTINGS);
  }
};

const steps = [
  {
    title: "Step 1: Connect to RBPsetup",
    description: "Go to your phone settings and connect to the Wi-Fi network named RBPsetup.",
    action: openWiFiSettings,
    buttonText: "Open Wi-Fi Settings",
  },
  {
    title: "Step 2: Open the Setup Page",
    description: "After connecting, visit the setup page:",
    link: "http://192.168.4.1:5000/",
  },
  {
    title: "Step 3: Enter Wi-Fi Credentials",
    description: "Enter the SSID and password for your home network to complete the setup.",
  },
];

const Onboarding = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-black px-6 justify-center">
      {/* Step Title */}
      <Text className="text-white text-2xl font-bold text-center mb-4">
        {steps[step].title}
      </Text>

      {/* Step Description */}
      <Text className="text-gray-400 text-center text-lg mb-4">
        {steps[step].description}
      </Text>

      {/* Clickable Link for Step 2 */}
      {steps[step].link && (
        <TouchableOpacity onPress={() => Linking.openURL(steps[step].link)}>
          <Text className="text-blue-400 text-center text-lg underline">
            {steps[step].link}
          </Text>
        </TouchableOpacity>
      )}

      {/* Open Wi-Fi Settings Button for Step 1 */}
      {steps[step].action && (
        <TouchableOpacity
          onPress={steps[step].action}
          className="bg-blue-600 px-6 py-3 rounded-full mt-4"
        >
          <Text className="text-white text-lg text-center font-semibold">
            {steps[step].buttonText}
          </Text>
        </TouchableOpacity>
      )}

      {/* Navigation Buttons */}
      <View className="absolute bottom-10 w-full flex-row justify-between px-6">
        {/* Back Button (Only Shows After Step 0) */}
        {step > 0 && (
          <TouchableOpacity
            onPress={() => setStep(step - 1)}
            className="bg-gray-700 px-6 py-3 rounded-full"
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        )}

        {/* Next Button */}
        <TouchableOpacity
          onPress={() => (step < steps.length - 1 ? setStep(step + 1) : router.push("/home"))}
          className="bg-green-600 px-6 py-3 rounded-full ml-auto"
        >
          <Text className="text-white text-lg font-bold">
            {step < steps.length - 1 ? "Next" : "Finish"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
