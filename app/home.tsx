import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, Linking, Image, View, TouchableOpacity } from "react-native";

const home = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#070808]">
      <View className="w-screen h-[10%] items-stretch justify-end">
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
              Tether
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
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          onPress={() => {
            router.push("/lock");
          }}
        >
          <Image className="m-auto" source={require("@assets/Powerr.png")} />
        </TouchableOpacity>
      </View>
      <View className=" w-screen items-center absolute bottom-10">
        <Image source={require("@assets/Expand_left_light.png")} />
        <Text className="text-white text-l">Select Device</Text>
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
