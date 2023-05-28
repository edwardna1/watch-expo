import { useRouter } from "expo-router";
import React from "react";
import { Text, Image, View } from "react-native";

export default function myDevice(props) {
  const router = useRouter();
  return (
    <View className="left-[8%] flex-row ">
      <Image source={require("@assets/desktop.png")} />
      <View className="justify-center gap-y-[2%] ml-[2%] ">
        <View className="flex-row flex">
          <Text className="text-lg text-white font-bold"></Text>
          <Text className="text-white text-lg ">{props.name}</Text>
        </View>
        <View className="w-screen">
          <View className="h-px w-7/12 bg-[#646464]"></View>
        </View>

        <View className="flex flex-row">
          <Text className="text-white text-sm font-semibold">Added: </Text>
          <Text className="text-white text-sm">{props.date}</Text>
        </View>
      </View>
    </View>
  );
}
