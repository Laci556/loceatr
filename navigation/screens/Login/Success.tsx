import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import Layout from '../../../components/layout';
import { Button } from '../../../components';
import { SuccessProps } from '../../../types/propTypes';

const { height } = Dimensions.get('window');

export default function Success({ navigation }: SuccessProps) {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: height * 0.35,
        paddingHorizontal: 24,
      }}>
      <View style={styles.backgroundLayer}>
        <Image
          source={require('../../../assets/illustrations/png/42.png')}
          resizeMode="contain"
          style={styles.image1}
        />
        <Image
          source={require('../../../assets/illustrations/png/23.png')}
          resizeMode="contain"
          style={styles.image2}
        />
        <Image
          source={require('../../../assets/illustrations/png/44.png')}
          resizeMode="contain"
          style={styles.image3}
        />
      </View>
      <Text category="h1">email elküldve!</Text>
      <Text
        category="s1"
        style={{ marginTop: 10, marginBottom: 20, textAlign: 'center' }}>
        kattints az email-ben kapott linkre a belépéshez!
      </Text>
      {/* <Button onPress={() => navigation.navigate('Login')} label="asd" /> */}
    </Layout>
  );
}

const styles = StyleSheet.create({
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  image1: {
    position: 'absolute',
    width: 300,
    top: 20,
    left: -170,
  },
  image2: {
    position: 'absolute',
    width: 100,
    top: 80,
    right: 30,
  },
  image3: {
    position: 'absolute',
    width: 170,
    bottom: 120,
    right: 69,
  },
});
