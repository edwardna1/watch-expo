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
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SignIn = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 flex bg-[#000000] h-screen">
      <View className="justify-center h-[63%]">
        <View className="h-full">
          <TouchableOpacity
            onPress={() => {
              router.push("/");
            }}
            className="my-[6%] mx-[3%] "
          >
            <Image source={require("@assets/BackArrow.png")} />
          </TouchableOpacity>
          <View className="items-center my-4">
            <View className="text-center">
              <Text className="text-white font-semibold text-6xl">Tether</Text>
            </View>
            <View className="my-[3%]">
              <Text className="text-white font-Nunsm font-light text-lg">
                Welcome!
              </Text>
            </View>
          </View>

          <View className="mx-[3.5%]">
            <View>
              <TextInput
                className="h-16 pl-4 pb-1 border-[#8B8B8B] border-0.5 text-base text-left bg-[#000000] text-[#B5B5B5] rounded-sm align-middle placeholder-[#ffffff] "
                placeholder="Username"
                placeholderTextColor="#8B8B8B"
                autoFocus
              ></TextInput>
            </View>
            <View className="mt-7">
              <TextInput
                className="h-16 pl-4 pb-1 text-white align-middle text-base border-[#8B8B8B] border-0.5 text-left bg-[#000000] rounded-sm mt-[2%]"
                placeholder="Password"
                placeholderTextColor="#8B8B8B"
              ></TextInput>
            </View>
            <View className="mb-[7%] mt-[5%] flex">
              <Text className=" text-[#767676] text-right">
                forgot your password?
              </Text>
            </View>
          </View>

          <View className="items-center mx-[3.5%]">
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.instagram.com/muhammad__dawood/")
              }
              className="bg-[#2E2E2E] mb-[5%] rounded-lg	w-full p-5"
            >
              <Text className=" font-medium	 text-[#B3B3B3] text-md text-center ">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="mx-[5%] my-[15%] flex-row items-center">
        <View className="flex-grow h-px border-t border-[#767676]"></View>
        <View className="flex-shrink">
          <Text className="text-[#767676] text- mx-7">or</Text>
        </View>
        <View className="flex-grow border-t  border-[#767676]"></View>
      </View>

      <View className="flex-row justify-around mx-[3.5%] ">
        <TouchableOpacity
          onPress={() => {
            router.push("/");
          }}
          className="items-center bg-transparent rounded-lg w-[30%] py-3 border-[#8B8B8B] border"
        >
          <Fontisto name="apple" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/");
          }}
          className="items-center bg-transparent rounded-lg w-[30%] py-3 border-[#8B8B8B] border"
        >
          <Fontisto name="facebook" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/");
          }}
          className="items-center bg-transparent rounded-lg w-[30%] py-3 border-[#8B8B8B] border"
        >
          <Ionicons name="ios-logo-google" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="items-center mt-[15%] inset-x-0 relative self-center flex-row">
        <Text className="text-sm text-[#ffffff]">Not registered? </Text>
        <Text className="text-sm text-[#70B2FF]">Create Account</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
