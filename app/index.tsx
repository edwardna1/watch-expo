import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, Animated, Easing } from "react-native";
import { Link } from "expo-router";
import { useStore } from "@lib/store";
import { useCallback, useEffect, useState } from "react";
import {
  useFonts,
  Lato_400Regular,
  OpenSans_400Regular,
  Inter_900Black,
  NunitoSans_700Bold,
} from "@expo-google-fonts/dev";
import Breathing from "@components/Breathing";
import { Logs } from "expo";
import Animtitle from "@components/Animtitle";

Logs.enableExpoCliLogging();
console.log("LOGGING EXPO IOS CONSOLE");
const App = () => {
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const click = useStore(useCallback((state) => state.click, []));
  let [fontsLoaded] = useFonts({
    Inter: Inter_900Black,
    Sans: OpenSans_400Regular,
    Lato: Lato_400Regular,
    Nunlg: NunitoSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center space-y-8 bg-black">
      {/* <View className="bg-[#202020]">
        <Image
          className="w-56 h-56 rounded-md"
          source={require("@assets/images/tea.jpg")}
        />
        <Text>Photo by Rumman Amin on Unsplash</Text>
      </View> */}
      <Animtitle>
        <Image
          className="ml-5"
          source={require("@assets/Add_round_light.png")}
        />
        {/* <Text className="text-7xl font-bold text-white font-nunl tracking-widest"> */}
          {/* Watch
        </Text> */}
      </Animtitle>
      <View>
        <Link
          className={`text-center w-full text-2xl p-2 text-white font-nunl`}
          href="/hello"
        >
          <Breathing>
            <Text className="text-white text-2xl">Tap to get started</Text>
          </Breathing>
        </Link>
      </View>
      <View></View>
      <Text className="text-xl">Look at the number of clicks: {click}</Text>
      <Link className="text-center w-48 text-white text-md p-2" href="/clicks">
        Go to the testing page
      </Link>
    </SafeAreaView>
  );
};

export default App;
