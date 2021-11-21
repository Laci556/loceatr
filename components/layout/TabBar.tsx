import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

export default ({ navigation }: BottomTabBarProps) => {
  return <View style={styles.main}></View>;
};

const styles = StyleSheet.create({
  main: {
    height: 65,
    position: 'absolute',
    borderRadius: 100,
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: '#EA552B',
  },
});
