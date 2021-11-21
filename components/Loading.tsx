import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@ui-kitten/components';

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon
        name="loader-outline"
        style={{ width: 50, height: 50 }}
        fill="#598BFF"
      />
    </View>
  );
}
