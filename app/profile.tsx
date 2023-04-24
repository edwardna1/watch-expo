import { useRouter } from "expo-router";
import React from "react";
import { Text, Image, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { Appbar } from "react-native-paper";

const MainProfile = () => {
  const router = useRouter()
  return (
    <SafeAreaView className="flex-1 bg-[#202020]">
      <View className="w-screen h-28 bg-[#202020] items-stretch justify-end">
        <View className="flex-row flex-none justify-between">
          <TouchableOpacity
          onPress={()=> {
            router.push("/home")
          }}
          >
            <Image className="ml-6" source={require("@assets/Arrow.png")} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-screen mt-11 bg-[#202020] flex-row  ">
        <View>
          <Text className="text-white ml-8 text-4xl font-lato">Edward Na</Text>
        </View>
      </View>

      <View className="w-screen flex-col h-24 items-stretch justify-end">
        <View className="flex-row justify-between">
          <View className="ml-8 justify-center">
            <Image source={require("@assets/SettingsIcon.png")} />
          </View>
          <View className="justify-center mr-28">
            <Text className="text-white text-xl font-light font-sans ">
              Settings
            </Text>
          </View>
          <View className="mr-7 mt-1 justify-center">
            <Image className="mt-1" source={require("@assets/Forward.png")} />
          </View>
        </View>
      </View>

      <View className="w-screen h-20 items-stretch justify-end">
        <View className="flex-row flex-none justify-between">
          <View className="ml-10 justify-center">
            <Image source={require("@assets/Locks.png")} />
          </View>
          <View className="justify-center mr-24">
            <Text className="text-white text-xl font-light font-sans ">
              Past Logs
            </Text>
          </View>
          <View className="mr-7 mt-1 justify-center">
            <Image className="mt-1" source={require("@assets/Forward.png")} />
          </View>
        </View>
      </View>

      <View className="w-screen h-20 items-stretch justify-end">
        <View className="flex-row flex-none">
          <View className="ml-11 justify-center">
            <Image source={require("@assets/Logout.png")} />
          </View>
          <View className="justify-center ml-12">
            <Text className="text-white text-xl font-light font-sans">
              Logout
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainProfile;
