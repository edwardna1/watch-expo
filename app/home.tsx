import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Text, Linking, Image, View, TouchableOpacity } from "react-native";
import data from "./data";
import MyDevice from "./myDevice";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { startDeviceScript } from "../utils/startDevice";
import { sendPushNotification } from "./notifications";
import { useStore } from "@lib/store";
import * as Notifications from "expo-notifications";

const home = () => {
  const expoPushToken = useStore(useCallback((state) => state.token, []));
  const router = useRouter();
  const Device = data.map((item) => {
    return <MyDevice name={item.name} date={item.date} />;
  });

  return (
    <SafeAreaView className="flex-1 bg-[#000000]">
      <View className="w-screen h-[8%]">
        <View className="flex flex-row items-center justify-between mx-[5%] mt-[5%]">
          <Octicons name="plus" size={30} color="white" />
          <TouchableOpacity
            onPress={() => {
              router.push("/");
            }}
          >
            <Text className="text-white font-bold text-center	text-3xl">
              Tether
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/Profile/profile");
            }}
          >
            <AntDesign name="user" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex h-[85%] relative items-center">
        <View className="absolute top-[15%] ">
          <TouchableOpacity
            onPress={async () => {
              const isStarted = await startDeviceScript();
              Notifications.scheduleNotificationAsync({
                content: {
                  title: isStarted
                    ? "Device Started"
                    : "Device Failed to Start",
                  body: isStarted
                    ? "The device started successfully!"
                    : "The device failed to start. Please try again.",
                },
                trigger: null,
              });
              router.push("/locked");
              // await sendPushNotification(expoPushToken);
              // router.push("/locked");
            }}
          >
            <Image
              className=" m-auto top-[90%] "
              source={require("@assets/Powerr.png")}
            />
          </TouchableOpacity>
        </View>
        <View className="flex justify-start top-[80%] mr-auto ml-[8%]">
          <Text className="text-white font-semibold text-xl">
            Selected Device
          </Text>
        </View>
        <View className="bg-[#0A0909] justify-center absolute h-[18%] top-[85%] rounded-3xl w-[95%] border ">
          {Device}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default home;
