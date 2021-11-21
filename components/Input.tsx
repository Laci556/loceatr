import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { yellow } from '../constants/colors';

export default function Input(props: TextInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      selectionColor={yellow}
      {...props}
      style={[styles.input, focused && styles.focused, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 100,
    backgroundColor: '#FFFFFF80',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: 'HKGrotesk-Medium',
  },
  focused: {
    backgroundColor: '#FFFFFFAA',
  },
});
