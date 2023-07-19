import { useRouter } from "expo-router";
import React from "react";
import { Text, Image, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const settings = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 relative bg-[#000000]">
      <View className="w-screen h-[8%] my-[7%]">
        <View className="flex flex-row items-center mx-[5%] ">
          <TouchableOpacity
            onPress={() => {
              router.push("/Profile/profile");
            }}
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex items-center mx-auto">
            <Text className="text-white font-bold text-center text-2xl ">
              Settings
            </Text>
          </View>
        </View>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex mr-[10%]">
          <MaterialCommunityIcons
            name="account-box-outline"
            size={34}
            color="white"
          />
        </View>
        <View className="flex mr-auto">
          <Text className="text-white text-base">Account</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push("/Profile/account");
          }}
          className="flex"
        >
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex justify-between items-center mt-[12%] flex-row mx-[5%]">
        <View className="flex mr-[10%]">
          <AntDesign name="exclamationcircleo" size={30} color="white" />
        </View>
        <View className="flex mr-auto">
          <Text className="text-white text-base">About</Text>
        </View>
        <View className="flex">
          <AntDesign name="right" size={24} color="white" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default settings;
