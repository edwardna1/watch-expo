import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure your Firebase config is correctly imported
import { useRouter } from "expo-router";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const Vids = () => {
  const [videos, setVideos] = useState([]); // Store videos fetched from Firestore
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  // Function to fetch videos from Firestore
  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const fetchedVideos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(fetchedVideos); // Update videos state
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Function to delete a video from Firestore and locally
  const deleteVideo = async (videoId) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "videos", videoId));

      // Update local state to remove the video
      setVideos((prevVideos) =>
        prevVideos.filter((video) => video.id !== videoId)
      );
      console.log(`Deleted video with ID: ${videoId}`);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  // Fetch videos on component mount
  useEffect(() => {
    fetchVideos();
  }, []);

  // Render right action for swipeable (delete button)
  const renderRightActions = (videoId) => {
    return (
      <TouchableOpacity
        onPress={() => deleteVideo(videoId)}
        className="bg-red-600 justify-center px-6"
      >
        <Text className="text-white font-bold">Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 bg-black">
        {/* Header */}
        <View className="px-4 py-6 border-b border-gray-800">
          <Text className="text-white text-2xl font-bold text-center">
            Video Database
          </Text>
        </View>

        {/* Main Content */}
        <View className="flex-1 px-6 py-4">
          {loading ? (
            <ActivityIndicator size="large" color="#4F46E5" />
          ) : (
            <ScrollView>
              {/* Table Header */}
              <View className="flex-row justify-between border-b border-gray-700 pb-2 mb-4">
                <Text className="flex-1 text-gray-400 font-semibold">Name</Text>
                <Text className="flex-1 text-gray-400 font-semibold">
                  Created At
                </Text>
              </View>

              {/* Table Rows */}
              {videos.length > 0 ? (
                videos.map((video) => (
                  <Swipeable
                    key={video.id}
                    renderRightActions={() => renderRightActions(video.id)}
                  >
                    <View className="flex-row justify-between border-b border-gray-800 py-3">
                      <Text
                        className="flex-1 text-white text-sm truncate"
                        numberOfLines={1}
                      >
                        {video.name}
                      </Text>
                      <Text className="flex-1 text-gray-400 text-sm">
                        {video.createdAt
                          ? video.createdAt.toDate().toLocaleString()
                          : "Unknown"}
                      </Text>
                    </View>
                  </Swipeable>
                ))
              ) : (
                <Text className="text-gray-400 text-center">
                  No videos found in the database.
                </Text>
              )}
            </ScrollView>
          )}
        </View>

        {/* Bottom Buttons */}
        <View className="px-6 py-4 bg-black flex-row justify-between items-center space-x-4">
          {/* Go to Home Page Button */}
          <TouchableOpacity
            onPress={() => router.push("/")}
            className="bg-violet-600 rounded-lg px-6 py-4 shadow-lg flex-1"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Go to Home
            </Text>
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push("/ping")}
            className="bg-blue-600 rounded-lg px-6 py-4 shadow-lg flex-1"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Vids;
