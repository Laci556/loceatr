import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import MasonryList from '@react-native-seoul/masonry-list';
import { sapphire, tan, yellow } from '../../../../constants/colors';
import {
  DBRecommendation,
  Recommendation,
} from '../../../../types/recommendation';
import { SharedElement } from 'react-navigation-shared-element';
import { HistoryScreenProps } from '../../../../types/propTypes';
import { useIsFocused } from '@react-navigation/core';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { supabase } from '../../../../initSupabase';
import dayjs from 'dayjs';

interface HistoryItemProps {
  item: Recommendation;
  onPress: () => void;
  focused: boolean;
}

const { height } = Dimensions.get('window');

function HistoryItem({ item, onPress, focused }: HistoryItemProps) {
  const [aspectRatio, setAspectRatio] = useState(Math.random() * 0.5 + 0.5);
  const [selected, setSelected] = useState(false);

  const textOpacity = useSharedValue(1);

  const handlePress = () => {
    setSelected(true);
    onPress();
  };

  useEffect(() => {
    if (!focused && selected) {
      textOpacity.value = withTiming(0, { duration: 40 });
    } else if (focused && selected) {
      textOpacity.value = withDelay(
        400,
        withTiming(1, { duration: 100, easing: Easing.quad })
      );
      setSelected(false);
    }
  }, [focused]);

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
      <View style={{ ...styles.historyItem, aspectRatio }}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={0.7}
          onPress={handlePress}>
          <View style={{ flex: 1 }}>
            <SharedElement id={`${item.id}.image`} style={{ flex: 1 }}>
              <Image
                source={{
                  uri: `${item.image}?${item.image_updated}`,
                }}
                style={{
                  flex: 1,
                  borderRadius: 24,
                }}
                resizeMode="cover"
              />
            </SharedElement>
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                right: 10,
              }}>
              <Animated.Text
                style={[
                  {
                    color: sapphire,
                    fontFamily: 'HKGrotesk-Bold',
                    backgroundColor: '#FBE8DE99',
                    borderRadius: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  },
                  textStyle,
                ]}>
                {item.name}
              </Animated.Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* <Text category="h6">{item.name}</Text> */}
    </View>
  );
}

export default function History({ navigation }: HistoryScreenProps) {
  const [data, setData] = useState<Recommendation[] | null>(null);
  const isFocused = useIsFocused();

  const fetchData = async () => {
    const { data: DBdata, error } = await supabase
      .from<DBRecommendation>('recommendations')
      .select(
        `
        created_at,
        places (
          id, name, address, lat, lng, image_updated, desc
        )
      `
      )
      .eq('user_id', supabase.auth.user()?.id || '0')
      .lt('created_at', dayjs().startOf('d').format())
      .order('created_at', { ascending: false });

    console.log(DBdata, error);

    setData(
      DBdata?.map((r) => ({
        id: r.places.id,
        image_updated: r.places.image_updated,
        name: r.places.name,
        address: r.places.address,
        location: { lat: r.places.lat, lon: r.places.lng },
        desc: r.places.desc,
        date: r.created_at,
        image: `https://kmniwalvylgtvmkfwdhq.supabase.in/storage/v1/object/public/images/${r.places.id}/profile.png`,
      })) || []
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Recommendation }) => {
    return (
      <HistoryItem
        key={item.id}
        item={item}
        onPress={() => {
          navigation.navigate('HistoryDetails', { item });
        }}
        focused={isFocused}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tan,
        paddingTop: StatusBar.currentHeight || 0,
      }}>
      {data !== null && (
        <MasonryList
          style={{ paddingHorizontal: 14, flex: 1 }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 100,
            minHeight: height,
          }}
          // TODO: 113
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 24,
              }}>
              <Text category="h4">még nem kaptál ajánlást</Text>
              <Text category="h4">¯\_(ツ)_/¯</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  historyItem: {
    borderRadius: 24,
    overflow: 'hidden',
    width: '100%',
  },
});
