import { useRouter } from "expo-router";
import React from "react";
import { Text, Image, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const personalInformation = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 relative bg-[#000000]">
      <View className="w-screen h-[8%] my-[7%]">
        <View className="flex flex-row items-center mx-[5%] ">
          <TouchableOpacity
            onPress={() => {
              router.push("/Profile/account");
            }}
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex items-center mx-auto">
            <Text className="text-white font-bold text-center text-2xl ">
              Personal Information
            </Text>
          </View>
        </View>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex mr-[20%]">
          <Text className="text-white text-base"> Email</Text>
        </View>
        <View className="flex mr-auto">
          <Text className="text-white text-base">Dawom2055@gmail.com</Text>
        </View>
      </View>

      <View className="my-[8%] ml-[30%]">
        <View className="flex-grow border-t mx-[5%] border-[#767676]"></View>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex mr-[18%]">
          <Text className="text-white text-base"> Phone</Text>
        </View>
        <View className="flex mr-auto">
          <Text className="text-white text-base">(548)-333-4497</Text>
        </View>
      </View>

      <View className="my-[8%]">
        <View className="flex-grow border-t mx-[5%] border-[#767676]"></View>
      </View>
    </SafeAreaView>
  );
};

export default personalInformation;
