import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@ui-kitten/components';
import MasonryList from '@react-native-seoul/masonry-list';
import { sapphire, tan, yellow } from '../../../../constants/colors';
import { Recommendation } from '../../../../types/recommendation';
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

interface HistoryItemProps {
  item: Recommendation;
  onPress: () => void;
  focused: boolean;
}

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
                source={{ uri: item.image }}
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
    setData([
      {
        name: 'Lakat Presszó asd asdasd',
        date: '22-11-2021',
        location: { lat: 47.4658541343269, lon: 19.022710423027938 },
        address: 'Budapest, Kelenföldi út 52, 1115',
        id: '1',
        image: 'https://kocsmablog.hu/wp-content/uploads/lakat-presszo-01.jpg',
      },
      {
        name: 'Lakat Presszó',
        date: '22-11-2021',
        location: { lat: 47.4658541343269, lon: 19.022710423027938 },
        address: 'Budapest, Kelenföldi út 52, 1115',
        id: '2',
        image: 'https://kocsmablog.hu/wp-content/uploads/lakat-presszo-01.jpg',
      },
      {
        name: 'Lakat Presszó',
        date: '22-11-2021',
        location: { lat: 47.4658541343269, lon: 19.022710423027938 },
        address: 'Budapest, Kelenföldi út 52, 1115',
        id: '3',
        image: 'https://kocsmablog.hu/wp-content/uploads/lakat-presszo-01.jpg',
      },
      {
        name: 'Lakat Presszó',
        date: '22-11-2021',
        location: { lat: 47.4658541343269, lon: 19.022710423027938 },
        address: 'Budapest, Kelenföldi út 52, 1115',
        id: '4',
        image: 'https://kocsmablog.hu/wp-content/uploads/lakat-presszo-01.jpg',
      },
      {
        name: 'Lakat Presszó',
        date: '22-11-2021',
        location: { lat: 47.4658541343269, lon: 19.022710423027938 },
        address: 'Budapest, Kelenföldi út 52, 1115',
        id: '5',
        image: 'https://kocsmablog.hu/wp-content/uploads/lakat-presszo-01.jpg',
      },
    ]);
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
      {data !== null && data.length && (
        <MasonryList
          style={{ paddingHorizontal: 14 }}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
          // TODO: 113
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
        />
      )}
      {data !== null && data.length === 0 && (
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
