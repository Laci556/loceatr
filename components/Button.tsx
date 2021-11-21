import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';
import { yellow } from '../constants/colors';

interface ButtonProps {
  onPress: () => any;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  label: string;
  disabled?: boolean;
}

export default function Button({
  onPress,
  style,
  textStyle,
  label,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled && { opacity: 0.6 }]}
      activeOpacity={0.5}
      disabled={disabled}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: yellow,
  },
  text: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },
});
