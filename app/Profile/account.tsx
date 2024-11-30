import { useRouter } from "expo-router";
import {
  Text,
  Image,
  Alert,
  Modal,
  View,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";

const account = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
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
            <Text className="text-white font-bold text-2xl ">Account</Text>
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
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          className="flex mr-auto"
        >
          <Text className="text-[#FD4444] text-base">Delete Account</Text>
        </TouchableOpacity>
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
              <Text className="text-white text-3xl font-bold">
                Delete Account?
              </Text>
              <Text className="text-white text-sm text-center">
                Deleting your account will remove all of your personal data
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
    </SafeAreaView>
  );
};

export default account;
