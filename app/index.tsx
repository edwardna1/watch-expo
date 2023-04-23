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
  const [isAnimDone, setIsAnimDone] = useState(false);
  let [fontsLoaded] = useFonts({
    Inter: Inter_900Black,
    Sans: OpenSans_400Regular,
    Lato: Lato_400Regular,
    Nunlg: NunitoSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  console.log("isAnimDone", isAnimDone);
  return (
    <SafeAreaView className="flex-1 flex bg-black">
      <View className="h-[50%]">
        <View>
          <Animtitle setIsAnimDone={setIsAnimDone}>
            <Image source={require("@assets/eyelogoremoved.png")} />
          </Animtitle>
        </View>
      </View>
      {isAnimDone && (
        <View className="justify-start items-center space-y-4 h-2/3 block">
          <View>
            <Link
              className={`font-nunl mt-20`}
              href="/hello"
            >
              <Breathing>
                <Text className="text-white text-xl">Tap to get started</Text>
              </Breathing>
            </Link>
          </View>
          <View></View>
          <Text className="text-xl">Look at the number of clicks: {click}</Text>
          <Breathing>
            <Link
              className="text-center w-48 text-white text-md p-2"
              href="/clicks"
            >
              Go to the testing page
            </Link>
          </Breathing>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
