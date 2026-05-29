import { Text } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  CSSTransitionProperties,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const MovingText = ({
  text,
  animationThreshold,
  style,
}: {
  text: string;
  animationThreshold: number;
  style: any;
}) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animationThreshold;
  const textWidth = text.length * 3;

  useEffect(() => {
    if (!shouldAnimate) return;

    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 2500,
          easing: Easing.linear,
        }),
        -1, // Infinite
        true, // Should reverse or not
      ),
    );

    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [translateX, text, animationThreshold, textWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        animatedStyle,
        style,
        shouldAnimate && {
          width: 9999,
          paddingLeft: 20,
        },
      ]}
    >
      <Text>{text}</Text>
    </Animated.Text>
  );
};

export default MovingText;
