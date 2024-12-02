import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useStore } from "@lib/store";
import { VideoPlayback } from "@components/VideoPlayback";

const Ping = () => {
  const logs = useStore((state) => state.logs);
  const pingCount = useStore((state) => state.pingCount);
  const isPinging = useStore((state) => state.isPinging);
  const startPinging = useStore((state) => state.startPinging);
  const stopPinging = useStore((state) => state.stopPinging);
  const resetPings = useStore((state) => state.resetPings);

  const router = useRouter();

  const isVideo = (url) => {
    return /\.(mp4|mov|avi|mkv|webm)$/i.test(url);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 py-3 border-b border-gray-800">
        <Text className="text-white text-2xl font-bold text-center">
          Videos
        </Text>
      </View>

      <View className="flex-1 px-4 py-4">
        <View className="flex-row justify-between items-center mb-4">
          {/* Start Ping Button */}
          <TouchableOpacity
            onPress={startPinging}
            className={`rounded-lg px-4 py-3 shadow-lg flex-1 mr-2 ${
              isPinging ? "bg-gray-600" : "bg-green-600"
            }`}
            disabled={isPinging}
          >
            <Text className="text-white text-sm font-semibold text-center">
              Start Ping
            </Text>
          </TouchableOpacity>

          {/* Stop Ping Button */}
          <TouchableOpacity
            onPress={stopPinging}
            className="bg-red-600 rounded-lg px-4 py-3 shadow-lg flex-1 ml-2"
          >
            <Text className="text-white text-sm font-semibold text-center">
              Stop Ping
            </Text>
          </TouchableOpacity>

          {/* Reset Button */}
          <TouchableOpacity
            onPress={resetPings}
            className="bg-gray-700 rounded-lg px-3 py-2 shadow-lg ml-2"
          >
            <Text className="text-white text-xs font-semibold text-center">
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ping Count */}
        <View className="bg-gray-900 rounded-lg py-2 px-4 mb-4 shadow-lg">
          <Text className="text-white text-sm font-medium">Total Pings:</Text>
          <Text className="text-green-400 text-xl font-bold">{pingCount}</Text>
        </View>

        {/* Ping Logs with Images, Videos, or YouTube Links */}
        <View className="flex-1 bg-gray-900 rounded-lg py-4 px-6 shadow-lg">
          <Text className="text-white text-lg font-medium mb-4">Log:</Text>
          <ScrollView>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <View key={index} className="mb-6">
                  {/* Handle Regular Videos */}
                  {log.url && <VideoPlayback url={log.url} />}
                  {/* Handle Images */}
                  {log.url && !isVideo(log.url) && (
                    <Image
                      source={{ uri: log.url }}
                      className="w-full h-48 rounded-lg mb-2"
                      resizeMode="cover"
                    />
                  )}
                  {/* Display Log Info */}
                  <View className="bg-gray-800 rounded-lg p-4">
                    <Text className="text-white text-base font-semibold mb-1">
                      {log.name || "No message provided"}
                    </Text>
                    {log.createdAt && (
                      <Text className="text-gray-400 text-sm font-light">
                        {log.createdAt.toDate().toLocaleString()}
                      </Text>
                    )}
                  </View>
                  {/* Separator */}
                  <View className="border-b border-gray-700 my-4"></View>
                </View>
              ))
            ) : (
              <Text className="text-gray-600 text-base">No pings yet...</Text>
            )}
          </ScrollView>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="px-4 py-3 bg-black flex-row justify-between items-center space-x-2">
        <TouchableOpacity
          onPress={() => router.push("/")}
          className="bg-violet-600 rounded-lg px-4 py-3 shadow-lg flex-1"
        >
          <Text className="text-white text-sm font-semibold text-center">
            Go to Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/vids")}
          className="bg-blue-600 rounded-lg px-4 py-3 shadow-lg flex-1"
        >
          <Text className="text-white text-sm font-semibold text-center">
            See DB
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Ping;
