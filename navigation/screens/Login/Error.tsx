import React from 'react';
import { Dimensions } from 'react-native';
import { Icon, Text, Layout, Button } from '@ui-kitten/components';
import { LoginErrorProps } from '../../../types/propTypes';

const { height } = Dimensions.get('window');

export default function Error({ navigation }: LoginErrorProps) {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: height * 0.15,
      }}>
      <Icon
        name="close-circle-outline"
        fill="#FF392B"
        style={{ width: 128, height: 128, marginBottom: 50 }}
      />
      <Text category="h1">Hiba!</Text>
      <Text
        category="s1"
        style={{ marginTop: 10, marginBottom: 20, textAlign: 'center' }}>
        Lehet, hogy lejárt a link, vagy már egyszer felhasználtad.
      </Text>
      <Button onPress={() => navigation.replace('Login')}>
        Vissza a bejelentkezéshez
      </Button>
    </Layout>
  );
}
