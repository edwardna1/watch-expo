import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, Animated, Easing } from "react-native";
import { Link } from "expo-router";
import { useStore } from "@lib/store";
import { useCallback, useEffect, useState } from "react";
import Breathing from "@components/Breathing";
import Animtitle from "@components/Animtitle";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const App = () => {
  const router = useRouter();
  // const fadeAnim = useRef(new Animated.Value(0)).current;
  const click = useStore(useCallback((state) => state.click, []));
  const isAnimDone = useStore(useCallback((state) => state.isAnimDone, []));
  const incrementClick = useStore(
    useCallback((state) => state.incrementClick, [])
  );
  const startPingListener = useStore((state) => state.startPingListener);

  useEffect(() => {
    startPingListener(); // Start the Firebase listener when the app loads

    return () => {
      // Cleanup is handled inside Zustand's store
    };
  }, [startPingListener]);
  return (
    <SafeAreaView className="flex-1 flex bg-[#070808]">
      <View className="h-[50%]">
        <View className="flex flex-row justify-between items-center px-4">
          {/* Login Button on the Left */}
          <TouchableOpacity
            onPress={() => {
              router.push("/login");
            }}
            className="w-1/3"
          >
            <Breathing
              class="border-2 py-3 px-10 rounded-lg items-center justify-center flex flex-nowrap"
              runOnce={true}
              cool={true}
            >
              <Text className="text-white font-lato text-md flex flex-nowrap">
                Login
              </Text>
            </Breathing>
          </TouchableOpacity>

          {/* Pinging Button on the Right */}
          <TouchableOpacity
            onPress={() => {
              router.push("/ping");
            }}
            className="w-1/3"
          >
            <Breathing
              class="border-2 py-3 px-10 rounded-lg items-center justify-center flex flex-nowrap"
              runOnce={true}
              cool={true}
            >
              <Text className="text-white font-lato text-md flex flex-nowrap">
                Pings
              </Text>
            </Breathing>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/notifications");
            }}
            className="w-1/3"
          >
            <Breathing
              class="border-2 py-3 px-2 rounded-lg items-center justify-center flex flex-nowrap"
              runOnce={true}
              cool={true}
            >
              <Text className="text-white font-lato text-md flex flex-nowrap">
                Notifications
              </Text>
            </Breathing>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/home");
            }}
          >
            <Animtitle>
              <Image source={require("@assets/eyelogoremoved.png")} />
            </Animtitle>
          </TouchableOpacity>
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
              router.push("/onboarding");
            }}
            // className="flex-1"
          >
            <Breathing
              class="mt-20 rounded-lg w-full items-center justify-center flex flex-nowrap"
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
