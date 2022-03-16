import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import Layout from '../../../components/layout';
import { SplashProps } from '../../../types/propTypes';
import { Button } from '../../../components';

const { height, width } = Dimensions.get('window');
const fullHeight = height + (StatusBar.currentHeight || 0);

export default function Splash({ navigation }: SplashProps) {
  return (
    <Layout
      style={{
        flex: 1,
        padding: 24,
        paddingTop: 160,
        backgroundColor: '#FBE8DE',
      }}>
      <View style={styles.backgroundLayer}>
        <Image
          source={require('../../../assets/illustrations/png/61.png')}
          style={styles.image1}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/illustrations/png/4.png')}
          style={styles.image2}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/illustrations/png/25.png')}
          style={styles.image3}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text
          style={{ fontFamily: 'Neco-Bold', fontSize: 52, color: '#160034' }}>
          loc
          <Text
            style={{ fontFamily: 'Neco-Bold', fontSize: 52, color: '#4CA96D' }}>
            eat
          </Text>
          r
        </Text>
      </View>
      <View style={{ flex: 1 }}></View>
      <View></View>
      <View>
        <Text category="s1" style={{ marginBottom: 30 }}>
          szeretnéd megismerni a környéken rejtőzködő éttermeket? esetleg
          beülnél egy kávéra? vagy péntek estére keresel programot?{'\n'}itt
          mind megtalálod!
        </Text>
        <Button onPress={() => navigation.navigate('Login')} label="tovább!" />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  backgroundLayer: {
    position: 'absolute',
    height: fullHeight,
    width: width,
  },
  image1: {
    width: 300,
    right: -150,
    position: 'absolute',
  },
  image2: {
    width: 250,
    top: -150,
    left: -100,
  },
  image3: {
    position: 'absolute',
    bottom: 150,
    left: -100,
    width: 200,
  },
});
