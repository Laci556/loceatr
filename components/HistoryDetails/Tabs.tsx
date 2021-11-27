import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import Review from './Review';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { darkTan } from '../../constants/colors';

interface TabButtonProps {
  selected: boolean;
  value: string;
  name: string;
  onPress: (v: string) => void;
}

function TabButton({ selected, value, name, onPress }: TabButtonProps) {
  return (
    <TouchableOpacity onPress={() => onPress(value)}>
      <Text
        style={[styles.textButton, selected && { backgroundColor: darkTan }]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

export default function Tabs() {
  const buttons = [
    { value: 'review', name: 'értékelés' },
    { value: 'open-hours', name: 'nyitvatartás' },
    { value: 'menu', name: 'menü' },
  ];
  const [selectedPre, setSelectedPre] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>(buttons[0].value);
  const opacity = useSharedValue(1);
  const animatedView = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const selectTab = (s: string) => {
    opacity.value = withSequence(
      withTiming(0, { duration: 100, easing: Easing.quad }, (isFinished) => {
        if (isFinished) runOnJS(setSelectedTab)(s);
      }),
      withDelay(10, withTiming(1, { duration: 100, easing: Easing.quad }))
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never">
        {buttons.map(({ value, name }) => (
          <TabButton
            name={name}
            value={value}
            onPress={selectTab}
            selected={selectedTab == value}
            key={value}
          />
        ))}
      </ScrollView>
      <Animated.View style={[{ marginTop: 20 }, animatedView]}>
        {selectedTab == 'review' && <Review />}
        {selectedTab == 'open-hours' && <Text>nyitvatartas</Text>}
        {selectedTab == 'menu' && <Text>menu</Text>}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  textButton: {
    fontFamily: 'HKGrotesk-SemiBold',
    fontSize: 18,
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
    paddingVertical: 6,
    // backgroundColor: darkTan,
    borderRadius: 10,
  },
});
