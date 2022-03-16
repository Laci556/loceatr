import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React, { useEffect } from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Navigation from './navigation';
import { AuthProvider } from './provider/AuthProvider';
import { default as mapping } from './mapping.json';
import { useFonts } from 'expo-font';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);
  const [loaded] = useFonts({
    'HKGrotesk-Regular': require('./assets/fonts/HKGrotesk/HKGrotesk-Regular.otf'),
    'HKGrotesk-Medium': require('./assets/fonts/HKGrotesk/HKGrotesk-Medium.otf'),
    'HKGrotesk-SemiBold': require('./assets/fonts/HKGrotesk/HKGrotesk-SemiBold.otf'),
    'HKGrotesk-Bold': require('./assets/fonts/HKGrotesk/HKGrotesk-Bold.otf'),
    'HKGrotesk-Italic': require('./assets/fonts/HKGrotesk/HKGrotesk-Italic.otf'),
    'Neco-Bold': require('./assets/fonts/Neco/Neco-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
        customMapping={mapping as any}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </ApplicationProvider>
    </>
  );
}
