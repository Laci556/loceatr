import React, { useEffect } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { orange, sapphire, yellow } from '../../constants/colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
// import { Text } from '@ui-kitten/components';

const icons2 = {
  Home: 'home',
  Settings: 'cog',
  History: 'bookmark',
};

const TabBarItem = ({
  name,
  onPress,
  active,
}: {
  name: string;
  onPress: () => void;
  active: boolean;
}) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: opacity.value }],
  }));

  useEffect(() => {
    if (active) {
      opacity.value = withSpring(1.2, { damping: 20, stiffness: 500 });
    } else {
      opacity.value = withSpring(0.8, { stiffness: 150, damping: 30 });
    }
  }, [active]);

  return (
    <TouchableOpacity
      style={{ marginHorizontal: -20 }}
      onPress={onPress}
      activeOpacity={1}>
      <Animated.View style={animatedStyle}>
        <FontAwesome
          name={icons2[name]}
          size={name == 'home' ? 40 : 36}
          color={sapphire}
          style={{ margin: 15 }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ({ navigation, state, descriptors }: BottomTabBarProps) => {
  return (
    <View style={styles.main}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TabBarItem
            name={route.name}
            key={route.name}
            active={isFocused}
            onPress={onPress}
          />
        );
      })}
      {/* {screens.map((screen) => (
        <TabBarItem name={screen} key={screen} active={} />
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 65,
    position: 'absolute',
    borderRadius: 65,
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: orange,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
