import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Video } from 'expo-av';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withDecay, cancelAnimation, withTiming } from 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Feather } from '@expo/vector-icons'; // Importing icon for sleek button

export const VideoPlayback = ({ url }: { url: string }) => {
  const screenWidth = Dimensions.get('window').width;
  const panoramaWidth = screenWidth * 3;

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const saveButtonOpacity = useSharedValue(0); // Initially hidden

  // Request media library permission
  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  React.useEffect(() => {
    requestPermission();
  }, []);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      cancelAnimation(translateX);
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
    })
    .onEnd((event) => {
      translateX.value = withDecay({
        velocity: event.velocityX,
      });
    });

  const animatedStyle = useAnimatedStyle(() => {
    const minTranslate = -panoramaWidth + screenWidth;
    return {
      transform: [{ translateX: Math.min(0, Math.max(minTranslate, translateX.value)) }],
    };
  });

  // Show/hide save button when video is tapped
  const toggleSaveButton = () => {
    saveButtonOpacity.value = withTiming(saveButtonOpacity.value === 0 ? 1 : 0, { duration: 300 });
  };

  const saveVideoToGallery = async () => {
    if (hasPermission === false) {
      Alert.alert('Permission Denied', 'Please enable media library access in settings.');
      return;
    }

    try {
      const filename = url.split('/').pop();
      const fileUri = `${FileSystem.documentDirectory}${filename}`;

      // Download the video first
      const { uri } = await FileSystem.downloadAsync(url, fileUri);

      // Save to iOS Photos
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Videos', asset, false);

      Alert.alert('Success', 'Video saved to Photos!');
      saveButtonOpacity.value = withTiming(0, { duration: 300 }); // Hide button after saving
    } catch (error) {
      Alert.alert('Error', 'Failed to save video.');
      console.error(error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ overflow: 'hidden', width: screenWidth, height: 250 }}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[{ width: panoramaWidth, height: '100%', borderRadius: 10 }, animatedStyle]}
          >
            <TouchableOpacity activeOpacity={1} onPress={toggleSaveButton} style={{ width: '100%', height: '100%' }}>
              <Video
                source={{ uri: url }}
                style={{ width: '100%', height: '100%' }}
                useNativeControls
                isLooping
                shouldPlay
              />
            </TouchableOpacity>
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Hidden Save Button (Appears on Tap) */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 15,
            right: 15,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
            borderRadius: 25,
            padding: 10,
          },
          useAnimatedStyle(() => ({ opacity: saveButtonOpacity.value })),
        ]}
      >
        <TouchableOpacity onPress={saveVideoToGallery}>
          <Feather name="download" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </GestureHandlerRootView>
  );
};
