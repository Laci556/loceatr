import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { ScrollLayout } from '../../../components/layout';
import { NotYet } from '../../../components';
import { supabase } from '../../../initSupabase';
import { tan } from '../../../constants/colors';

const { width } = Dimensions.get('window');

export default function Home() {
  useEffect(() => {
    // supabase.auth.signOut();
  });

  return (
    <ScrollLayout>
      <View style={{ width: '100%', aspectRatio: 1.3 }}>
        <NotYet />
      </View>
      <Text category="h4" style={{ marginTop: 10 }}>
        még nem árulhatjuk el a mai ajánlásod, nézz vissza később!
      </Text>
    </ScrollLayout>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: tan,
    // paddingTop: StatusBar.currentHeight || 0,
  },
  homeInner: {
    paddingBottom: 113,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
});
