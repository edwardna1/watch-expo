import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useStore } from "@lib/store";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { getUsers } from "../requests/getUsers";
import { formatDate } from "../utils/formatDate";
import { deleteUser } from "../requests/deleteUser";
import { startDeviceScript, stopDeviceScript } from "../utils/startDevice";

const Clicks = () => {
  const click = useStore(useCallback((state) => state.click, []));
  const token = useStore(useCallback((state) => state.token, []));
  const incrementClick = useStore(
    useCallback((state) => state.incrementClick, [])
  );
  const decrementClick = useStore(
    useCallback((state) => state.decrementClick, [])
  );
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-slate-500 p-4">
      <View>
        <Text className="text-xl font-bold text-white mb-4">User List</Text>
      </View>
      <View className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <View className="flex-row bg-violet-400 p-4">
          <Text className="flex-1 font-bold text-white">Username</Text>
          <Text className="flex-1 font-bold text-white">Password</Text>
          <Text className="flex-1 font-bold text-white">Created At</Text>
          <Text className="font-bold text-white">Action</Text>
        </View>

        {users.map((user) => (
          <View
            key={user.id}
            className="flex-row items-center border-b border-gray-200 px-4 py-2"
          >
            <Text className="flex-1 text-gray-800">{user.username}</Text>
            <Text className="flex-1 text-gray-800">{user.password}</Text>
            <Text className="flex-1 text-gray-800">
              {formatDate(user.createdAt)}
            </Text>
            <TouchableOpacity
              onPress={() => handleDelete(user.id)}
              className="bg-red-500 px-3 py-1 rounded"
            >
              <Text className="text-white text-sm">Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View className="flex-1" />
      <Text className="text-2xl font-semibold text-center text-white mb-6">
        Zustand tester
      </Text>
      <View className="bg-violet-700 rounded-t-lg px-6 py-4 shadow-lg">
        <View className="flex flex-row items-center justify-center space-x-4">
          <TouchableOpacity
            className="bg-red-500 rounded-full p-4 shadow-md"
            onPress={decrementClick}
          >
            <Text className="text-white text-lg font-bold">-</Text>
          </TouchableOpacity>

          <Text className="text-3xl font-bold text-white">{click}</Text>
          <TouchableOpacity
            className="bg-green-500 rounded-full p-4 shadow-md"
            onPress={incrementClick}
          >
            <Text className="text-white text-lg font-bold">+</Text>
          </TouchableOpacity>
        </View>

        {/* New Start/Stop Buttons */}
        <View className="flex flex-row justify-center space-x-4 mt-6">
          <TouchableOpacity
            className="bg-blue-500 rounded-lg px-6 py-3 shadow-md"
            onPress={startDeviceScript}
          >
            <Text className="text-white text-lg font-semibold">Start Script</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-500 rounded-lg px-6 py-3 shadow-md"
            onPress={stopDeviceScript}
          >
            <Text className="text-white text-lg font-semibold">Stop Script {token}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-6 bg-blue-500 rounded-lg px-6 py-3 shadow-md"
          onPress={incrementClick}
        >
          <Text className="text-white text-lg font-semibold text-center">
            Try Me
          </Text>
        </TouchableOpacity>

        <Link
          className="mt-4 w-full bg-violet-600 text-lg p-3 rounded-lg shadow-md text-center text-white font-semibold"
          href="/"
        >
          Go to Home Page
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Clicks;
