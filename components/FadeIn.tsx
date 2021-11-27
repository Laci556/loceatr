import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

interface FadeInProps {
  children: React.ReactNode;
  delayMS?: number;
  show: boolean;
  delayTotal?: number;
}

export default function FadeIn({
  children,
  delayMS = 0,
  show,
  delayTotal = 0,
}: FadeInProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (show) {
      opacity.value = withDelay(delayMS, withTiming(1));
    } else {
      opacity.value = withDelay(delayTotal - delayMS, withTiming(0));
    }
  }, [show]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
