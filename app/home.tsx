import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, Linking, Image, View, TouchableOpacity } from "react-native";
import data from "./data";
import MyDevice from "./myDevice";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 


const home = () => {
  const router = useRouter();
  const Device = data.map((item) => {
    return <MyDevice name={item.name} date={item.date} />;
  });

  return (
    <SafeAreaView className="flex-1 bg-[#000000]">
      <View className="w-screen h-[8%]">
        <View className="flex flex-row items-center justify-between mx-[5%] mt-[5%]">
          <Ionicons name="add" size={35} color="white" />
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
              router.push("/profile");
            }}
          >
            <Ionicons name="ios-person-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex h-[85%] relative items-center">
        <View className="absolute top-[15%] ">
          <TouchableOpacity
            onPress={() => {
              router.push("/lock");
            }}
          >
            <Image
              className=" m-auto top-[90%] "
              source={require("@assets/Powerr.png")}
            />
          </TouchableOpacity>
        </View>
        <View className="bg-[#0e0e0e] justify-center absolute h-[18%] bottom-[3%] rounded-3xl w-[95%] border ">
          {Device}
        </View>
      </View>

      <View className="h-full w-screen items-center bottom-0">
        <Image source={require("@assets/Expand_left_light.png")} />
        <Text className="text-white text-sm">Select Device</Text>
      </View>
    </SafeAreaView>
  );
};

export default home;
