import React, { useState, useEffect, useRef } from "react";
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
import { useRouter } from "expo-router";

const Ping = () => {
  const [pingCount, setPingCount] = useState(0);
  const [logs, setLogs] = useState([]); // Store logs fetched from Firestore
  const [isPinging, setIsPinging] = useState(false); // Track pinging state
  const intervalRef = useRef(null); // Ref to hold the interval ID for adding documents
  const startTimeRef = useRef(null); // Ref to hold the interval ID for adding documents
  const router = useRouter();

  // Function to generate a unique video name
  const generateVideoName = () => {
    const timestamp = new Date().toISOString(); // e.g., 2024-11-29T12:30:00.000Z
    const randomString = Math.random().toString(36).substring(2, 8); // Random string
    return `video_${timestamp}_${randomString}`;
  };

  // Start pinging: add a new document every 5 seconds
  const startPinging = () => {
    if (isPinging) return; // Prevent multiple intervals
    setIsPinging(true);

    intervalRef.current = setInterval(async () => {
      try {
        const videoName = generateVideoName();
        await addDoc(collection(db, "videos"), {
          name: videoName,
          createdAt: new Date(),
        });
        console.log(`Pinged: ${videoName}`);
      } catch (error) {
        console.error("Error adding video:", error);
      }
    }, 1000); // Add a record every 5 seconds
  };

  // Stop pinging
  const stopPinging = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPinging(false);
    console.log("Stopped pinging...");
  };

  // Real-time listener for the "videos" collection
  useEffect(() => {
    const startTime = new Date(); // Capture the current time on component mount

    // Query Firestore to fetch only documents created after the component mounts
    const videosQuery = query(
      collection(db, "videos"),
      where("createdAt", ">=", startTime)
    );

    const unsubscribe = onSnapshot(videosQuery, (snapshot) => {
      const fetchedLogs = snapshot.docs.map((doc) => {
        const data = doc.data();
        return `Name: ${data.name}, Timestamp: ${data.createdAt
          .toDate()
          .toLocaleString()}`;
      });

      setLogs(fetchedLogs); // Update logs in real time
      setPingCount(fetchedLogs.length); // Update the ping count
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

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
              isPinging ? "bg-gray-600" : "bg-green-600"
            }`}
            disabled={isPinging} // Disable while already pinging
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
