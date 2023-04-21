import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import React from "react";
import { Text, Linking, Image, View, TouchableOpacity } from "react-native";

const Hello = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#202020]">
      <View className="w-screen h-28 bg-[#202020] items-stretch justify-end">
        <View className="flex-row flex-none justify-between">
          <Image
            className="ml-5"
            source={require("@assets/Add_round_light.png")}
          />
          <Text className="text-white font-bold text-center	text-3xl">
            Watch
          </Text>
          <Image
            className="mr-8 mt-1"
            source={require("@assets/User_light.png")}
          />
        </View>
      </View>
      <View className="h-screen w-screen absolute justify-center items-center">
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.instagram.com/muhammad__dawood/")
          }
        >
          <Image className="m-auto" source={require("@assets/Powerr.png")} />
        </TouchableOpacity>
      </View>
      <Link className="text-center w-48 bg-violet-400 text-md p-2" href="/">
        Go to Home Page
      </Link>
      <View className=" w-screen items-center absolute bottom-10">
        <Image source={require("@assets/Expand_left_light.png")} />
        <Text className="text-white text-l">Select Device</Text>
      </View>
    </SafeAreaView>
  );
};

export default Hello;

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
