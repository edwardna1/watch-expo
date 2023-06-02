import { useRouter } from "expo-router";
import React from "react";
import { Text, Image, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const account = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 relative bg-[#000000]">
      <View className="w-screen h-[8%] my-[7%]">
        <View className="flex flex-row items-center mx-[5%]">
             <TouchableOpacity
            onPress={() => {
              router.push("/Profile/settings");
            }}
            className=""
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>   
          <View className="mx-auto">
            <Text className="text-white font-bold text-2xl ">
              Account
            </Text>
          </View>
        </View>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
         
        <View className="flex mr-auto">
          <Text className="text-white text-base">Personal Information</Text>
        </View>

        <TouchableOpacity
            onPress={() => {
              router.push("/Profile/personalinformation");
            }}
            className="flex"
          >
          <AntDesign name="right" size={24} color="white" />
          </TouchableOpacity>   

      </View>

      <View className="flex justify-between items-center mt-[12%] flex-row mx-[5%]">
        <View className="flex mr-auto">
          <Text className="text-white text-base">Change Password</Text>
        </View>

        <TouchableOpacity
            onPress={() => {
              router.push("/Profile/changepassword");
            }}
            className="flex"
          >
          <AntDesign name="right" size={24} color="white" />
          </TouchableOpacity> 
          </View>  

      <View className="flex items-center mt-[12%] flex-row mx-[5%]">
        <View className="flex mr-auto">
          <Text className="text-[#FD4444] text-base">Delete Account</Text>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default account;
