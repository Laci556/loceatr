import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  ViewStyle,
  StatusBar,
  View,
} from 'react-native';
import { Layout as KittenLayout } from '@ui-kitten/components';
import { tan } from '../../constants/colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import ScrollLayout from './ScrollLayout';

interface Props {
  style?: ViewStyle;
}

const Layout: React.FC<Props> = ({ children, style = {} }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: tan,
      }}>
      <KittenLayout style={{ flex: 1, backgroundColor: tan, ...style }}>
        {children}
      </KittenLayout>
    </SafeAreaView>
  );
};

export default Layout;
export { ScrollLayout };
