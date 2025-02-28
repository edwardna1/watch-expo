import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useStore } from "@lib/store";
import { VideoPlayback } from "@components/VideoPlayback";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width * 0.75;

const LockedScreen = () => {
  const router = useRouter();
  const logs = useStore((state) => state.logs);
  const [slideX] = useState(new Animated.Value(0));

  // Handle slide gesture
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      const newX = Math.min(Math.max(0, gesture.dx), SLIDER_WIDTH);
      slideX.setValue(newX);
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SLIDER_WIDTH * 0.8) {
        router.push("/home");
      } else {
        Animated.spring(slideX, { toValue: 0, useNativeDriver: false }).start();
      }
    },
  });

  // Function to check if URL is a video
  const isVideo = (url: string) => /\.(mp4|mov|avi|mkv|webm)$/i.test(url);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header Section */}
      <View className="absolute top-10 left-5">
        <Text className="text-white text-3xl font-bold">Device TETHERED</Text>
        <Text className="text-green-400 mt-1">LOCKED MODE 🔒 CONNECTED</Text>
      </View>

      {/* Logs Section */}
      <View className="flex-1 mt-24 px-4">
        <ScrollView className="space-y-4">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <View key={index} className="bg-gray-900 rounded-lg p-3">
                {/* Timestamp Row */}
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-400 font-semibold">
                    {new Date(log.createdAt.toDate()).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </Text>
                  <Text className="text-gray-400 font-semibold">
                    {new Date(log.createdAt.toDate()).toLocaleTimeString(
                      "en-US",
                      { hour: "numeric", minute: "2-digit", hour12: true }
                    )}
                  </Text>
                </View>

                {/* Video or Image Display */}
                <View className="mt-2">
                  {log.url && isVideo(log.url) ? (
                    <VideoPlayback url={log.url} />
                  ) : (
                    <Image
                      source={{ uri: log.url }}
                      className="w-full h-48 rounded-lg"
                      resizeMode="cover"
                    />
                  )}
                </View>
              </View>
            ))
          ) : (
            <View className="flex-1 justify-center items-center mt-20">
              <Image
                source={{ uri: "https://files.catbox.moe/4vpbk3.png" }}
                className="w-64 h-64"
                resizeMode="contain"
              />
              <View className="absolute bottom-[-40px] px-4 py-2 rounded-md">
                <Text className="text-white text-center italic">
                  Everything seems alright.{"\n"}Nothing to worry about
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Slide to Unlock Section */}
      <View className="absolute bottom-20 w-full flex items-center">
        <View className="w-[80%] h-[50px] bg-gray-800 rounded-full justify-center relative">
          <Animated.View
            {...panResponder.panHandlers}
            style={{
              transform: [{ translateX: slideX }],
              position: "absolute",
              left: 5,
            }}
          >
            <View className="w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center">
              <AntDesign name="arrowright" size={24} color="black" />
            </View>
          </Animated.View>
          <Text className="text-white absolute left-[50px] text-lg">
            Slide to unlock
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LockedScreen;
