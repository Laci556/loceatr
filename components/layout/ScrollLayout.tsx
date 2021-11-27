import React from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { tan } from '../../constants/colors';

const ScrollLayout: React.FC = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: tan }}>
      <View style={{ height: StatusBar.currentHeight || 0 }}></View>
      <ScrollView
        style={styles.layout}
        contentContainerStyle={styles.layoutInner}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default ScrollLayout;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight || 0,
  },
  layoutInner: {
    paddingBottom: 100,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
});
