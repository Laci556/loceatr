import React, { useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Layout from '../../../components/layout';
import { Button, Input } from '../../../components';
import { LoginProps } from '../../../types/propTypes';
import { supabase } from '../../../initSupabase';
import * as Linking from 'expo-linking';

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }: LoginProps) {
  const [emailError, setEmailError] = useState(false);
  const [loading, setLodaing] = useState(false);
  const [email, setEmail] = useState('');

  const sendEmail = async () => {
    console.log(Linking.createURL(''));
    setLodaing(true);
    const { error } = await supabase.auth.signIn(
      { email },
      {
        redirectTo: Linking.createURL('/magic-link'),
      }
    );
    setLodaing(false);
    if (error) {
      console.log(error);
      // TODO: error handling
    } else {
      if (navigation.canGoBack()) {
        navigation.popToTop();
      }
      navigation.replace('Success');
    }
  };

  return (
    <Layout
      style={{
        padding: 24,
        paddingTop: 75,
        flex: 1,
      }}>
      <View style={styles.backgroundLayer}>
        <Image
          source={require('../../../assets/illustrations/png/61.png')}
          style={styles.image1}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/illustrations/png/42.png')}
          resizeMode="contain"
          style={styles.image2}
        />
        <Image
          source={require('../../../assets/illustrations/png/31.png')}
          resizeMode="contain"
          style={styles.image3}
        />
      </View>
      <Text category="h5">add meg az email címed és máris tag lehetsz!</Text>
      <View style={{ marginTop: 100 }}>
        <Input
          placeholder="nincs más ahová írhatnád ¯\_(ツ)_/¯"
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text category="c2" style={{ marginTop: 10 }}>
          ne aggódj, a bejelentkezéshez szükséges email-eken kívül semmivel nem
          fogunk zaklatni :)
        </Text>
        {/* <Button
          onPress={() => navigation.navigate('Success')}
          label="asdasd"></Button> */}
      </View>
      <Button
        style={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
        }}
        onPress={sendEmail}
        disabled={loading}
        label="mehet"
      />
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
    width: 300,
    left: -150,
    position: 'absolute',
  },
  image2: {
    position: 'absolute',
    width: 300,
    top: 20,
    right: -130,
  },
  image3: {
    position: 'absolute',
    width: 120,
    // bottom: 45,
    top: height - 170,
    left: width / 2 - 100,
    transform: [{ rotateZ: '30deg' }],
  },
});
