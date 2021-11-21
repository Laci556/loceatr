import React, { useState, useEffect, useRef } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/routers';
import { AuthContext } from '../provider/AuthProvider';
import { supabase } from '../initSupabase';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import Home from './screens/Root/Home';
import Login from './screens/Login/Login';
import Splash from './screens/Login/Splash';
import LoginError from './screens/Login/Error';
import Success from './screens/Login/Success';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/layout/TabBar';

export type RootStackParamList = {
  Home: undefined;
};

export type LoginStackParamList = {
  Login: undefined;
  Splash: undefined;
  Success: undefined;
  LoginError: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();
const LoginStack = createNativeStackNavigator<LoginStackParamList>();

export default () => {
  const auth = React.useContext(AuthContext);
  const user = auth.user;
  const [toLoginErrorScreen, setToLoginErrorScreen] = useState(false);
  const navigationRef =
    useRef<NavigationContainerRef<ReactNavigation.RootParamList>>(null);

  const handleInitialURL = async () => {
    const url = await Linking.getInitialURL();
    if (url) {
      handleURL({ url });
    }
  };

  const goToLoginError = () => {
    if (navigationRef.current?.canGoBack()) {
      navigationRef.current?.dispatch(StackActions.popToTop());
    }
    navigationRef.current?.dispatch(StackActions.replace('LoginError'));
  };

  const handleURL = async ({ url }: { url: string }) => {
    console.log('event handler', url);
    const parsed = Linking.parse(url);

    switch (parsed.path) {
      case 'magic-link':
        if (user) return;
        const params = new URLSearchParams('?' + url.split('#')[1]);
        if (params.has('error_code')) {
          setToLoginErrorScreen(true);
          goToLoginError();
        } else {
          const refreshToken = params.get('refresh_token') || '';
          const { error } = await supabase.auth.signIn({ refreshToken });
          if (error) {
            setToLoginErrorScreen(true);
            goToLoginError();
          }
        }
        break;
    }
  };

  useEffect(() => {
    handleInitialURL();
    Linking.addEventListener('url', handleURL);
    return () => {
      Linking.removeEventListener('url', handleURL);
    };
  }, []);

  useEffect(() => {
    if (user != null) {
      SplashScreen.hideAsync();
    }
  }, [user]);

  return (
    <NavigationContainer ref={navigationRef}>
      {user == true && (
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
          tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
      )}
      {user == false && (
        <LoginStack.Navigator
          // initialRouteName={toLoginErrorScreen ? 'LoginError' : 'Splash'}
          initialRouteName="Success"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <LoginStack.Screen name="Splash" component={Splash} />
          <LoginStack.Screen name="Login" component={Login} />
          <LoginStack.Screen name="Success" component={Success} />
          <LoginStack.Screen name="LoginError" component={LoginError} />
        </LoginStack.Navigator>
      )}
    </NavigationContainer>
  );
};
