import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useStore } from "@lib/store";

const Ping = () => {
  const logs = useStore((state) => state.logs);
  const pingCount = useStore((state) => state.pingCount);
  const isPinging = useStore((state) => state.isPinging);
  const startPinging = useStore((state) => state.startPinging);
  const stopPinging = useStore((state) => state.stopPinging);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 py-6 border-b border-gray-800">
        <Text className="text-white text-2xl font-bold text-center">
          Ping Dashboard
        </Text>
      </View>

      <View className="flex-1 px-6 py-4">
        <View className="flex-row justify-between items-center mb-6">
          {/* Start Ping Button */}
          <TouchableOpacity
            onPress={startPinging}
            className={`rounded-lg px-6 py-4 shadow-lg flex-1 mr-3 ${
              isPinging ? "bg-gray-600" : "bg-green-600"
            }`}
            disabled={isPinging}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Start Ping
            </Text>
          </TouchableOpacity>

          {/* Stop Ping Button */}
          <TouchableOpacity
            onPress={stopPinging}
            className="bg-red-600 rounded-lg px-6 py-4 shadow-lg flex-1 ml-3"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Stop Ping
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ping Count */}
        <View className="bg-gray-900 rounded-lg py-4 px-6 mb-6 shadow-lg">
          <Text className="text-white text-lg font-medium">Total Pings:</Text>
          <Text className="text-green-400 text-2xl font-bold">{pingCount}</Text>
        </View>

        {/* Ping Logs */}
        <View className="flex-1 bg-gray-900 rounded-lg py-4 px-6 shadow-lg">
          <Text className="text-white text-lg font-medium mb-4">Ping Log:</Text>
          <ScrollView>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <Text key={index} className="text-gray-400 text-base mb-2">
                  {log}
                </Text>
              ))
            ) : (
              <Text className="text-gray-600 text-base">No pings yet...</Text>
            )}
          </ScrollView>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="px-6 py-4 bg-black flex-row justify-between items-center space-x-4">
        <TouchableOpacity
          onPress={() => router.push("/")}
          className="bg-violet-600 rounded-lg px-6 py-4 shadow-lg flex-1"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Go to Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/vids")}
          className="bg-blue-600 rounded-lg px-6 py-4 shadow-lg flex-1"
        >
          <Text className="text-white text-lg font-semibold text-center">
            See DB
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Ping;
