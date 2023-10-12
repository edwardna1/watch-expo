import { useRouter } from "expo-router";
import { Text, Image, View, SafeAreaView, TextInput, Modal, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Feather } from '@expo/vector-icons'; 


const changePassword = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 relative bg-[#000000]">
      <View className="w-screen h-[8%] mb-[5%] mt-[7%]">
        <View className="flex flex-row justify-between items-center mx-[5%] ">
          <TouchableOpacity
            onPress={() => {
              router.push("/Profile/account");
            }}
          >
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex ">
            <Text className="text-white font-bold text-center text-2xl ">
              Change Password
            </Text>
          </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true); 
                }}
                className="flex"
              >
                <Text className="text-[#9B9B9B] font-bold text-center text-base ">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            </View>

            <View className="flex-1 justify-center align-middle m-[10%]">
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View className="flex-1 justify-center items-center shadow-lg mx-auto">
                  <View className="items-center justify-center bg-[#131313] rounded-lg w-[80%] p-[10%] border gap-y-[10%]">
                  <Feather name="check-circle" size={60} color="green" />
                    <Text className="text-white text-sm text-center">
                      You're password has been reset!
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        router.push("/home");
                      }}
                      className="items-center bg-[#FD4444] rounded-lg py-[5%] w-full px-[30%] border"
                    >
                      <Text className="text-white text-base font-semibold">
                        Delete
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text className="text-white text-lg font-semibold">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

      </View>
      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex">
          <TextInput
            className="text-[#9B9B9B] text-base w-screen"
            placeholder="Current password"
            placeholderTextColor="#9B9B9B"
          ></TextInput>
        </View>
      </View>

      <View className="my-[8%]">
        <View className="flex-grow border-t mx-[5%] border-[#767676]"></View>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex mr-[18%]">
          <TextInput
            className="text-[#9B9B9B] text-base w-screen"
            placeholder="New password"
            placeholderTextColor="#9B9B9B"
          ></TextInput>
        </View>
      </View>

      <View className="my-[8%]">
        <View className="flex-grow border-t mx-[5%] border-[#767676]"></View>
      </View>

      <View className="flex justify-between items-center flex-row mx-[5%]">
        <View className="flex mr-[18%]">
          <TextInput
            className="text-[#9B9B9B] text-base w-screen"
            placeholder="Confirm new password"
            placeholderTextColor="#9B9B9B"
          ></TextInput>
        </View>
      </View>

      <View className="my-[8%]">
        <View className="flex-grow border-t mx-[5%] border-[#767676]"></View>
      </View>
    </SafeAreaView>
  );
};

export default changePassword;
