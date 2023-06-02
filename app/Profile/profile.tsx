import { useRouter } from "expo-router";
import React from "react";
import { Text, Image, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FcHeadset } from "react-icons/fc";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const MainProfile = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 relative bg-[#000000]">
      <View className="">
        <TouchableOpacity
          onPress={() => {
            router.push("/home");
          }}
          className="mt-[6%] mx-[3%] "
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="mx-[5%] my-[12%]  ">
        <Text className="text-white text-4xl">Edward Na</Text>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex mr-[10%]">
          <Ionicons name="settings-outline" size={30} color="white" />
        </View>
        <View className="flex mr-auto">
          <Text className="text-white text-base">Settings</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push("/Profile/settings");
          }}
          className="flex"
        >
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex mt-[12%] justify-between items-center flex-row mx-[5%]">
        <View className="flex mr-[10%]">
          <MaterialIcons name="logout" size={30} color="white" />
        </View>
        <View className="flex mr-auto">
          <Text className="text-white text-base">Logout</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainProfile;
