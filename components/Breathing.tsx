import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Animated, ViewStyle, Text, Easing } from "react-native";

type BreathingProps = PropsWithChildren<{
  style?: ViewStyle;
  isText?: boolean;
  transform?: boolean;
}>;

const Breathing: React.FC<BreathingProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0.1)).current; // Initial value for opacity: 0

  const size = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.3,
      duration: 800,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      fadeAnim.setValue(0.3);
    });
  };

  useEffect(() => {
    console.log("here1");
    // startAnimation();
    Animated.sequence([
      // Animated.delay(2000),
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start(() => {
      console.log("here");
    });
  }, [fadeAnim]);

  return props.isText ? (
    <Animated.Text // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.Text>
  ) : (
    <Animated.View // Special animatable View
      style={[
        {
          ...props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        },
        props.transform
          ? {
              transform: [
                {
                  scaleX: size,
                },
                {
                  scaleY: size,
                },
              ],
            }
          : {},
      ]}
    >
      {props.children}
    </Animated.View>
  );
};

export default Breathing;
