import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure your Firebase config is correctly imported
import { useRouter } from "expo-router"; // For navigation

const Ping = () => {
  const [pingCount, setPingCount] = useState(0);
  const [logs, setLogs] = useState([]); // Store logs fetched from Firestore
  const [isListening, setIsListening] = useState(false); // Track listening state
  const intervalRef = useRef(null); // Ref to hold the interval ID for adding documents
  const unsubscribeRef = useRef(null); // Ref to hold the unsubscribe function for Firestore
  const startTimeRef = useRef(null); // Ref to store the start time
  const router = useRouter();

  // Function to generate a unique video name
  const generateVideoName = () => {
    const timestamp = new Date().toISOString(); // e.g., 2024-11-29T12:30:00.000Z
    const randomString = Math.random().toString(36).substring(2, 8); // Random string
    return `video_${timestamp}_${randomString}`;
  };

  // Function to start pinging and listening
  const startPinging = () => {
    if (isListening) return; // Prevent multiple intervals and listeners
    setIsListening(true);

    // Record the current timestamp as the start time
    startTimeRef.current = new Date();

    // Query Firestore for new documents after the start time
    const videosQuery = query(
      collection(db, "videos"),
      where("createdAt", ">=", startTimeRef.current)
    );

    unsubscribeRef.current = onSnapshot(videosQuery, (snapshot) => {
      const fetchedLogs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return `Name: ${data.name}, Timestamp: ${data.createdAt
          .toDate()
          .toLocaleString()}`;
      });

      setLogs(fetchedLogs); // Update logs in real time
      setPingCount(fetchedLogs.length); // Update the ping count
    });

    // Start adding new documents every 5 seconds
    intervalRef.current = setInterval(async () => {
      try {
        const videoName = generateVideoName();
        await addDoc(collection(db, "videos"), {
          name: videoName,
          createdAt: new Date(),
        });
        console.log(`Added video: ${videoName}`);
      } catch (error) {
        console.error("Error adding video:", error);
      }
    }, 1000);

    console.log("Started pinging and listening...");
  };

  // Function to stop pinging and listening
  const stopPinging = () => {
    // Stop listening to Firestore
    if (unsubscribeRef.current) {
      unsubscribeRef.current(); // Unsubscribe from Firestore
      unsubscribeRef.current = null;
    }

    // Stop adding new documents
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval
      intervalRef.current = null;
    }

    setIsListening(false); // Update the listening state
    console.log("Stopped pinging and listening...");
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="px-4 py-6 border-b border-gray-800">
        <Text className="text-white text-2xl font-bold text-center">
          Ping Dashboard
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-6 py-4">
        {/* Start and Stop Buttons */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={startPinging}
            className={`rounded-lg px-6 py-4 shadow-lg flex-1 mr-3 ${
              isListening ? "bg-gray-600" : "bg-green-600"
            }`}
            disabled={isListening} // Disable while already listening
          >
            <Text className="text-white text-lg font-semibold text-center">
              Start Ping
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={stopPinging}
            className="bg-red-600 rounded-lg px-6 py-4 shadow-lg flex-1 ml-3"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Stop Ping
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ping Count Display */}
        <View className="bg-gray-900 rounded-lg py-4 px-6 mb-6 shadow-lg">
          <Text className="text-white text-lg font-medium">Total Pings:</Text>
          <Text className="text-green-400 text-2xl font-bold">{pingCount}</Text>
        </View>

        {/* Ping Log */}
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

      {/* Bottom Section */}
      <View className="px-6 py-4 bg-black flex-row justify-between items-center space-x-4">
        {/* Go to Home Page Button */}
        <TouchableOpacity
          onPress={() => router.push("/")}
          className="bg-violet-600 rounded-lg px-6 py-4 shadow-lg flex-1"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Go to Home Page
          </Text>
        </TouchableOpacity>

        {/* See DB Button */}
        <TouchableOpacity
          onPress={() => router.push("/vids")} // This can link to a dedicated DB page
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
