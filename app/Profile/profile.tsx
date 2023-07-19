import { useRouter } from "expo-router";
import React from "react";
import { Text, Image, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import BackButton from "@components/common/BackButton";

const MainProfile = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 relative bg-[#000000]">
      <View className="flex">
        <BackButton
          onPress={() => {
            router.push("/home");
          }}
          classNames={""}
        />
      </View>
      <View className="mx-[10%] my-[12%]">
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
