import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ListItem, Text } from '@ui-kitten/components';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Review from './Review';
import OpenHours from './OpenHours';
import { darkTan } from '../../constants/colors';
import { Recommendation } from '../../types/recommendation';

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

const { width } = Dimensions.get('window');

export default function Tabs({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const buttons = [
    // { value: 'menu', name: 'menü' },
    { value: 'open-hours', name: 'nyitvatartás' },
    { value: 'review', name: 'értékelés' },
  ];
  const [selectedTab, setSelectedTab] = useState<string>(buttons[0].value);
  const translateX = useSharedValue(0);
  const animatedView = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    translateX.value = withTiming(
      -Object.values(buttons)
        .map((o) => o.value)
        .indexOf(selectedTab) * width
    );
  }, [selectedTab]);

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
            onPress={setSelectedTab}
            selected={selectedTab == value}
            key={value}
          />
        ))}
      </ScrollView>
      <View
        style={{
          marginTop: 20,
          overflow: 'visible',
          width: width - 48,
        }}>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              width: width * buttons.length,
            },
            animatedView,
          ]}>
          {buttons.map((s) => (
            <View style={{ width: width - 48, marginRight: 48 }} key={s.value}>
              {s.value == 'review' && <Review placeID={recommendation.id} />}
              {s.value == 'open-hours' && (
                <OpenHours placeId={recommendation.id} />
              )}
              {s.value == 'menu' && <Text>menu</Text>}
            </View>
          ))}
        </Animated.View>
      </View>
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
