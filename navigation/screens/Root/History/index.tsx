import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { tan } from '../../../../constants/colors';
import { Recommendation } from '../../../../types/recommendation';
import History from './History';
import HistoryDetails from './HistoryDetails';

export type HistoryStackParamList = {
  HistoryScreen: undefined;
  HistoryDetails: {
    item: Recommendation;
  };
};

const Stack = createSharedElementStackNavigator<HistoryStackParamList>();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: tan,
      },
    }}>
    <Stack.Screen component={History} name="HistoryScreen" />
    <Stack.Screen
      component={HistoryDetails}
      name="HistoryDetails"
      sharedElements={(route, otherRoute, showing) => {
        const { item } = route.params;
        return [`${item.id}.image`];
      }}
    />
  </Stack.Navigator>
);
