import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, Linking, Image, View, TouchableOpacity } from "react-native";

const home = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#000000]">
      <View className="w-screen h-[8%] items-stretch justify-end">
        <View className="flex flex-row flex-no-wrap justify-between">
          <Image
            className="ml-5"
            source={require("@assets/Add_round_light.png")}
          />
          <TouchableOpacity
            onPress={() => {
              router.push("/");
            }}
          >
            <Text className="text-white font-bold text-center	text-3xl">
              Watch
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/profile");
            }}
          >
            <Image
              className="mr-8 mt-2"
              source={require("@assets/User_light.png")}
            />
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
        <View className="bg-[#0B0B0B] justify-center absolute h-[20%] bottom-[2%] rounded-3xl w-[95%] border border-[#181818]">
          <View className="left-[8%] flex-row ">
            <Image source={require("@assets/desktop.png")} />
            <View className="justify-center gap-y-[2%] ml-[2%] ">
              <Text className="text-white text-base">Eddie's Laptop</Text>
              <View className="w-screen">
                <View className="h-px w-7/12 bg-[#646464]"></View>
              </View>
              <Text className="text-white text-sm">
                Added: September 19, 2021
              </Text>
            </View>
          </View>
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

// // const Hello = () => {
// //   return (
// //     <SafeAreaView className="flex-1 flex items-center justify-center space-y-8">
// //       <Text className="text-xl">Hi 👋, this is another page</Text>
// //       <Link className="text-center w-48 bg-violet-400 text-md p-2" href="/">
// //         Go to Home Page
// //       </Link>
// //     </SafeAreaView>
// //   );
// // };

// export default Hello;
