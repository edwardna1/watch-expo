import Slider from "@components/Slider";
import React from "react";
import { Text, Image, View, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import Breathing from "@components/Breathing";

const DefaultLockScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#000000]">
      <View className="mt-5 ml-10 w-screen h-[8%] bg-[#000000] items-stretch justify-end">
        <Text className="mb-2 font-extrabold text-4xl text-white">
          Edwards Laptop
        </Text>
      </View>

      <View className="ml-10 w-screen bg-[#000000] flex-row ">
        <View>
          <Text className="font-semibold  text-white">LOCKED MODE</Text>
        </View>

        <View>
          <Image
            className="ml-2 h-4 w-4"
            source={require("@assets/Lock.png")}
          />
        </View>

        <View>
          <Breathing>
            <Text className="ml-4 font-semibold text-xs text-[#44FF00]">
              CONNECTED
            </Text>
          </Breathing>
        </View>
      </View>

      <View className="h-[65%] w-screen justify-center">
        <Image className="mr-9" source={require("@assets/LaptopMain.png")} />
      </View>

      <View className=" w-screen items-center absolute bottom-[6%]">
        {/* <Image source={require("@assets/Slide.png")} />
         */}
        <Slider
          onToggle={() => {
            router.push("/home");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DefaultLockScreen;
