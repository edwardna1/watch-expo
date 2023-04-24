import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, Animated, Easing } from "react-native";
import { Link } from "expo-router";
import { useStore } from "@lib/store";
import { useCallback, useEffect, useState } from "react";
import Breathing from "@components/Breathing";
import { Logs } from "expo";
import Animtitle from "@components/Animtitle";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
Logs.enableExpoCliLogging();
console.log("LOGGING EXPO IOS CONSOLE");
const App = () => {
  const router = useRouter();
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const click = useStore(useCallback((state) => state.click, []));
  const isAnimDone = useStore(useCallback((state) => state.isAnimDone, []));
  const incrementClick = useStore(
    useCallback((state) => state.incrementClick, [])
  );

  // const [isAnimDone, setIsAnimDone] = useState(false);
  // if (isAnimDone) {
  //   incrementClick();
  //   setIsAnimDone(false);
  // }
  return (
    <SafeAreaView className="flex-1 flex bg-black">
      <View className="h-[50%]">
        <TouchableOpacity
          onPress={() => {
            router.push("/login");
          }}
        >
          <Breathing
            class="border-2 py-3 px-10 rounded-lg bg-[#450202] focus:bg-[#b9b9b9] w-1/3 items-center justify-center flex flex-nowrap"
            runOnce={true}
            cool={true}
          >
            {/* <Text className="text-white">sss</Text> */}
            {/* Get started */}
            <Text className="text-white font-lato text-lg flex flex-nowrap">
              Login
            </Text>
          </Breathing>
        </TouchableOpacity>
        <View>
          <Animtitle>
            <Image source={require("@assets/eyelogoremoved.png")} />
          </Animtitle>
        </View>
      </View>
      {(isAnimDone || click > 0) && (
        <View className="justify-start items-center space-y-4 h-2/3 w-full">
          {/* <TouchableOpacity
            // className="border-2 py-5 mt-20 rounded-lg w-1/2 h-18 items-center justify-center bg-[#323232] focus:bg-[#b9b9b9]"
            className="flex-1"
            onPress={() => {
              router.push("/home");
            }}
          > */}
          {/* <Link href="/home"> */}
          <TouchableOpacity
            onPress={() => {
              router.push("/home");
            }}
            // className="flex-1"
          >
            <Breathing
              class="border-2 py-3 px-10 mt-20 rounded-lg bg-[#450202] focus:bg-[#b9b9b9] w-full items-center justify-center flex flex-nowrap"
              runOnce={true}
              cool={true}
            >
              {/* <Text className="text-white">sss</Text> */}
              {/* Get started */}
              <Text className="text-white font-lato text-lg flex flex-nowrap">
                Get started
              </Text>
            </Breathing>
          </TouchableOpacity>
          {/* </Link> */}
          {/* </Link> */}
          {/* </TouchableOpacity> */}

          <View></View>
          <Text className="text-xl text-white">
            {/* Look at the number of clicks: {click} */}
          </Text>
          <Breathing class="mt-20">
            <Link
              className="text-center w-48 text-white text-md p-2"
              href="/clicks"
            >
              Go to the testing page clicks: {click}
            </Link>
          </Breathing>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
