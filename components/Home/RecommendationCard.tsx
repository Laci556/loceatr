import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Recommendation } from '../../types/recommendation';
import { Text } from '@ui-kitten/components';
import { Ionicons, Feather } from '@expo/vector-icons';
import { darkTan } from '../../constants/colors';
import * as Linking from 'expo-linking';
import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import hu from 'dayjs/locale/hu';
import { supabase } from '../../initSupabase';
import { toToday } from '../../utils';

dayjs.locale(hu);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

const { width } = Dimensions.get('window');

const NavButton = ({
  icon,
  onPress,
  iconPack,
}: {
  icon: string;
  iconPack: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: darkTan,
        borderRadius: 10,
        height: 45,
        width: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      }}
      activeOpacity={0.6}
      onPress={onPress}>
      {iconPack == 'ionicons' ? (
        <Ionicons name={icon as any} size={32} style={{ opacity: 0.8 }} />
      ) : iconPack == 'feather' ? (
        <Feather name={icon as any} size={32} style={{ opacity: 0.8 }} />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default function RecommendationCard({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  const [closingTime, setClosingTime] = useState<Dayjs>();

  const fetchOpenHours = async () => {
    console.log('nap', ((dayjs().day() + 6) % 7) + 1);

    const { data, error } = await supabase
      .from<{
        place_id: number;
        weekday: number;
        opens: string;
        closes: string;
      }>('open_hours')
      .select('closes, opens')
      .eq('place_id', recommendation.id)
      .eq('weekday', ((dayjs().day() + 6) % 7) + 1);

    console.log(data);

    if (!data) return; // TODO

    if (data.length == 1) {
      setClosingTime(toToday(data[0].closes));
    } else {
      let closing: Dayjs | null = null;
      for (let { opens, closes } of data) {
        if (
          dayjs().isBetween(toToday(opens), toToday(closes), 'minute', '()')
        ) {
          closing = toToday(closes);
        }
      }
      if (!closing) {
        closing = toToday(data[data.length - 1].closes);
      }

      setClosingTime(closing);
    }
  };

  useEffect(() => {
    fetchOpenHours();
  }, []);

  const openNav = () => {
    Linking.openURL(
      'https://www.google.com/maps/dir/?api=1&destination=' +
        encodeURIComponent(recommendation.address) +
        '&dir_action=navigate'
    );
  };

  const openPhone = () => {
    Linking.openURL('tel:' + recommendation.tel);
  };

  return (
    <View>
      <View>
        <Image
          source={{
            uri: `${recommendation.image}?${recommendation.image_updated}`,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text category="h2" style={{ marginTop: 10 }}>
        {recommendation.name}
      </Text>
      <Text style={{ marginBottom: 10 }} category="h6">
        {recommendation.desc}
      </Text>
      <Text category="s1">{recommendation.address}</Text>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <NavButton icon="navigation" onPress={openNav} iconPack="feather" />
        {recommendation.tel && (
          <NavButton icon="phone" onPress={openPhone} iconPack="feather" />
        )}
        <View style={{ flex: 1 }}></View>
        <NavButton
          icon="ios-qr-code-outline"
          onPress={() => {}}
          iconPack="ionicons"
        />
      </View>

      {closingTime && (
        <Text category="h6" style={{ marginTop: 10 }}>
          zárás {closingTime.fromNow()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 24,
    aspectRatio: 1.5,
    width: width - 48,
  },
});
