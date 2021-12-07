import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import { ScrollLayout } from '../../../components/layout';
import { NotYet } from '../../../components';
import { supabase } from '../../../initSupabase';
import { tan } from '../../../constants/colors';
import * as Notifications from 'expo-notifications';
import { SupabaseRealtimeClient } from '@supabase/supabase-js/dist/main/lib/SupabaseRealtimeClient';
import { HomeProps } from '../../../types/propTypes';
import {
  DBRecommendation,
  Recommendation,
} from '../../../types/recommendation';
import * as Location from 'expo-location';
import RecommendationCard from '../../../components/Home/RecommendationCard';

const { width } = Dimensions.get('window');

export default function Home({ navigation }: HomeProps) {
  const [recommendation, setRecommendation] = useState<
    Recommendation | null | false
  >(null);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: '@laci556/pentek-van',
      })
    ).data;
    const { data, error } = await supabase
      .from('push_tokens')
      .insert({ user_id: supabase.auth.user()?.id, token });

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.High,
    });
    return {
      lng: location.coords.longitude,
      lat: location.coords.latitude,
    };
  };

  const saveDBrec = (r: DBRecommendation) => {
    setRecommendation({
      ...r.places,
      date: r.created_at,
      location: {
        lat: r.places.lat,
        lon: r.places.lng,
      },
      id: r.places.id,
      image: `https://kmniwalvylgtvmkfwdhq.supabase.in/storage/v1/object/public/images/${r.places.id}/profile.png`,
    });
  };

  const fetchRecommendation = async () => {
    const uid = supabase.auth.user()?.id || '';

    const { data: recommendationPref } = await supabase
      .from<{ can_recieve: boolean; recieved_today: boolean; user_id: string }>(
        'recommendation_preferences'
      )
      .select('can_recieve, recieved_today')
      .eq('user_id', uid)
      .maybeSingle();

    if (!recommendationPref) {
      return;
    }

    if (recommendationPref.recieved_today) {
      const { data: latestRecommendation } = await supabase
        .from<DBRecommendation>('recommendations')
        .select('*, places (*)')
        .eq('user_id', uid)
        .order('created_at', {
          ascending: false,
        })
        .limit(1)
        .single();

      console.log(latestRecommendation);
      if (!latestRecommendation) return;

      saveDBrec(latestRecommendation);
    } else if (recommendationPref.can_recieve) {
      const location = await getLocation();
      const { data: newRecommendation, error: errorRandom } = await supabase
        .rpc<DBRecommendation>('get_random_place', {
          u_id: uid,
          user_lat: location?.lat,
          user_lng: location?.lng,
        })
        .maybeSingle();

      if (!newRecommendation) return;

      saveDBrec(newRecommendation);
    } else {
      setRecommendation(false);
    }
  };

  useEffect(() => {
    // supabase.auth.signOut();
    registerForPushNotificationsAsync();
    fetchRecommendation();
    const subscription = Notifications.addNotificationResponseReceivedListener(
      () => {
        navigation.navigate('Home');
        if (!recommendation) {
          fetchRecommendation();
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ScrollLayout>
      {recommendation && <RecommendationCard recommendation={recommendation} />}
      {recommendation === false && (
        <View>
          <View style={{ width: '100%', aspectRatio: 1.3 }}>
            <NotYet />
          </View>
          <Text category="h4" style={{ marginTop: 10 }}>
            még nem árulhatjuk el a mai ajánlásod, nézz vissza később!
          </Text>
        </View>
      )}
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
