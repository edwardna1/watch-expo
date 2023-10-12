import { useRouter } from "expo-router";
import React from "react";
import { Text, Image, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import BackButton from "@components/common/BackButton";
import SettingRows from "@components/common/SettingRows"


const MainProfile = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 relative bg-[#000000]">
      <View className="flex">
        <BackButton
          onPress={() => {
            router.push("/home");
          }}
          classNames={"flex ml-[5%] my-[9%]"}
        />
      </View>
      <View className="mx-[5%] mb-[12%]">
        <Text className="text-white text-4xl">Edward Na</Text>
      </View>

      <SettingRows
      icon = "settings-outline"
      SectionName= "Settings"
      onPress ={() => {
        router.push("/Profile/settings");
      }}
      
      />

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
