import { useStore } from "@lib/store";
import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { Animated, ViewStyle, Text, Easing, View } from "react-native";

type BreathingProps = PropsWithChildren<{
  style?: ViewStyle;
  transform?: boolean;
}>;

const Animtitle: React.FC<BreathingProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(20)).current; // Initial value for opacity: 0
  const textAnim = useRef(
    Array.from({ length: 5 }).map((x) => new Animated.Value(0))
  ).current;
  const finishAnimation = useStore(
    useCallback((state) => state.finishAnimation, [])
  );
  const word = "WATCH".split("");

  const startTitleAnimation = () => {
    return Animated.stagger(50, [
      Animated.timing(textAnim[0], {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim[1], {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim[2], {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim[3], {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim[4], {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]);
  };

  useEffect(() => {
    console.log("Started anim");

    Animated.sequence([
      Animated.delay(500),

      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 20,
          duration: 0,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1300,
          easing: Easing.elastic(0.68),
          useNativeDriver: true,
        }),
        // Animated.delay(50),
        startTitleAnimation(),
        Animated.delay(1000),
      ]),
    ]).start(() => {
      console.log("Animation DONE");
      finishAnimation()
    });
  }, [fadeAnim]);
  // console.log("props.children", props.children);
  return (
    <View className="items-center flex flex-col h-full justify-end">
      <View className="absolute top-10">
        <Animated.View // Special animatable View
          style={[
            {
              ...props.style,
              // opacity: fadeAnim, // Bind opacity to animated value
            },
            {
              transform: [
                {
                  scaleX: fadeAnim,
                },
                {
                  scaleY: fadeAnim,
                },
              ],
            },
          ]}
        >
          {props.children}
        </Animated.View>
      </View>
      <View className="flex flex-row justify-start">
        {word.map((letter, index) => {
          return (
            <Animated.Text // Special animatable View
              key={index}
              style={[
                {
                  ...props.style,
                  opacity: textAnim[index], // Bind opacity to animated value
                },
              ]}
            >
              <Text className="text-white text-6xl font-sans justify-center tracking-widest mt-5">
                {letter}
              </Text>
            </Animated.Text>
          );
        })}
      </View>
    </View>
  );
};

export default Animtitle;
