import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';
import { Text } from '@ui-kitten/components';
import Layout from '../../../components/layout';
import { NotYet } from '../../../components';
import { supabase } from '../../../initSupabase';

const { width } = Dimensions.get('window');

export default function Home() {
  useEffect(() => {
    // supabase.auth.signOut();
  });

  return (
    <Layout style={styles.home}>
      <View style={{ width: '100%', aspectRatio: 1.3 }}>
        <NotYet />
      </View>
      <Text category="h4" style={{ marginTop: 10 }}>
        még nem árulhatjuk el a mai javaslatod, nézz vissza később!
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  home: {
    padding: 24,
    paddingTop: 10 + (StatusBar.currentHeight || 0),
  },
});
