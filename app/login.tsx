import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  Linking,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const SignIn = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 flex bg-black">
      <TouchableOpacity
        onPress={() => {
          router.push("/");
        }}
        className="justify-start items-center bg-[#450202] rounded-lg w-1/3 p-1"
      >
        <Text className="text-white font-nunl items-center text-xl ">Back</Text>
      </TouchableOpacity>
      <View className="flex justify-center h-3/4">
        <View className="relative items-center mb-7">
          <View className="text-center">
            <Text className="text-white font-Nunsb text-6xl">Welcome</Text>
          </View>
          <View>
            <Text className="text-white font-Nunsm font-light text-lg">
              Sign in to your account
            </Text>
            <Icon size={12} name="amazon"/>
          </View>
        </View>

        <View className="mx-7">
          <View className="w-full">
            <TextInput
              className="h-11 pl-4 pb-1 text-white text-base text-left bg-[#2E2E2E] rounded-xl shadow-sm shadow-[#141414]"
              placeholder="Username"
            ></TextInput>
          </View>
          <View className="w-full mt-7 ">
            <TextInput
              className="h-11 pl-4 pb-1 text-white text-base text-left bg-[#2E2E2E] rounded-xl shadow-sm shadow-[#141414]"
              placeholder="Password"
            ></TextInput>
          </View>
          <View className="relative mt-2">
            <Text className=" text-[#767676] right-0 absolute">
              forgot your password?
            </Text>
          </View>
        </View>

        <View className="relative items-center top-24">
          <View className="absolute items-center">
            <Text className="text-white text-Nunsb ">
              Don't have an account?
            </Text>
            <Text className="mt-3 text-[#70B2FF]">Create account</Text>
          </View>
        </View>
      </View>

      <View className="relative mt-8">
        <View className="right-10 absolute items-center flex-row">
          <Text className="text-white text-2xl mr-5 font-Nunsb ">Sign In</Text>
          <View className="box-border bg-[#2E2E2E] h-10 w-16 rounded-xl items-center">
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.instagram.com/muhammad__dawood/")
              }
            >
              <Image
                className="mt-0.5 h-9 w-9"
                source={require("@assets/NextArrow.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
