import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const MessageBanner = ({ message, onClose, className }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Animation state for opacity

  useEffect(() => {
    // Automatically fade out after 2 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // Fade out duration
        useNativeDriver: true,
      }).start(() => {
        onClose(); // Call onClose when animation is complete
      });
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  return (
    <Animated.View
      style={[
        styles.banner,
        { opacity: fadeAnim }, // Bind opacity to animation
      ]}
      className={className}
    >
      <Text style={styles.message} className="text-sm text-[#ffffff]">
        {message}
      </Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "#00ff00",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  message: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    marginLeft: 10,
  },
});
