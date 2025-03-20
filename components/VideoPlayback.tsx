import React, { useRef, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withDecay, cancelAnimation } from 'react-native-reanimated';

export const VideoPlayback = ({ url }: { url: string }) => {
  const screenWidth = Dimensions.get('window').width;
  const panoramaWidth = screenWidth * 3; // Adjust based on video aspect ratio

  // Independent gesture state for each video
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

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

  return (
    <GestureHandlerRootView style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ overflow: 'hidden', width: screenWidth, height: 250 }}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[{ width: panoramaWidth, height: '100%', borderRadius: 10 }, animatedStyle]}>
            <Video
              source={{ uri: url }}
              style={{ width: '100%', height: '100%' }}
              useNativeControls
              isLooping
              shouldPlay
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};
