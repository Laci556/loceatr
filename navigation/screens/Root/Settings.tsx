import { Text } from '@ui-kitten/components';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../../components';
import { ScrollLayout } from '../../../components/layout';
import { supabase } from '../../../initSupabase';

export default function Settings() {
  return (
    <ScrollLayout>
      <Text>settings</Text>
      <Button
        onPress={() => supabase.auth.signOut()}
        label="kijelentkezés"></Button>
    </ScrollLayout>
  );
}

const styles = StyleSheet.create({});
