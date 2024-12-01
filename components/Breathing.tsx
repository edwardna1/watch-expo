import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Animated, ViewStyle, Text, Easing, View } from "react-native";

type BreathingProps = PropsWithChildren<{
  // style?: ViewStyle;
  isText?: boolean;
  class?: string;
  runOnce?: boolean;
  cool?: boolean;
}>;

const Breathing: React.FC<BreathingProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0.1)).current; // Initial value for opacity: 0
  // console.log("props", props);

  const onceAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {});
  };

  useEffect(() => {
    // startAnimation();
    if (props.runOnce) {
      onceAnimation();
    } else {
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
      ]).start();
    }
  }, [fadeAnim]);

  return props.isText ? (
    <Animated.Text // Special animatable View
      style={
        {
          // ...props.style,
          // opacity: fadeAnim, // Bind opacity to animated value
        }
      }
    >
      {props.children}
    </Animated.Text>
  ) : (
    <Animated.View // Special animatable View
      style={{
        // ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
      className={props.class ?? ""}
    >
      {props.children}
    </Animated.View>
  );
};

export default Breathing;
