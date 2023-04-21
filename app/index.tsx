import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View } from "react-native";
import { Link } from "expo-router";
import { useStore } from "@lib/store";
import { useCallback } from "react";
import {
  useFonts,
  Lato_400Regular,
  OpenSans_400Regular,
  Inter_900Black,
  NunitoSans_700Bold
} from '@expo-google-fonts/dev';
const App = () => {
  const click = useStore(useCallback((state) => state.click, []));
  let [fontsLoaded] = useFonts({
    'Inter': Inter_900Black,
    'Sans' : OpenSans_400Regular,
    'Lato' : Lato_400Regular,
    'Nunlg' : NunitoSans_700Bold
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
      <Text className="text-7xl font-bold text-white font-nunl">Watch</Text>
      <Link
        className="text-center w-full text-2xl p-2 text-white font-nunl"
        href="/hello"
      >
        Tap to get started
      </Link>
      <Text className="text-xl">Look at the number of clicks: {click}</Text>
      <Link
        className="text-center w-48 text-white text-md p-2"
        href="/clicks"
      >
        Go to the testing page
      </Link>
    </SafeAreaView>
  );
};

export default App;
