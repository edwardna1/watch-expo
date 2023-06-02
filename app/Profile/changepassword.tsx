import { useRouter } from "expo-router";
import React from "react";
import { Text, Image, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const changePassword = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 relative bg-[#000000]">
      <View className="w-screen h-[8%] mb-[5%] mt-[7%]">
        <View className="flex flex-row justify-between items-center mx-[5%] ">
          <TouchableOpacity
            onPress={() => {
              router.push("/Profile/account");
            }}
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex ">
            <Text className="text-white font-bold text-center text-2xl ">
              Change Password
            </Text>
          </View>
          <View className="flex ">
            <Text className="text-[#9B9B9B] font-bold text-center text-base ">
              Save
            </Text>
          </View>
        </View>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex">
          <Text className="text-[#9B9B9B] text-base"> Current password</Text>
        </View>
      </View>

      <View className="my-[8%]">
        <View className="flex-grow border-t mx-[5%] border-[#767676]"></View>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex mr-[18%]">
          <Text className="text-[#9B9B9B] text-base">New Password</Text>
        </View>
      </View>

      <View className="my-[8%]">
        <View className="flex-grow border-t mx-[5%] border-[#767676]"></View>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex mr-[18%]">
          <Text className="text-[#9B9B9B] text-base">Confirm New Password</Text>
        </View>
      </View>

      <View className="my-[8%]">
        <View className="flex-grow border-t mx-[5%] border-[#767676]"></View>
      </View>
    </SafeAreaView>
  );
};

export default changePassword;
