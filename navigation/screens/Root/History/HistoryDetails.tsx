import React, { useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { SharedElement } from 'react-navigation-shared-element';
import { ScrollLayout } from '../../../../components/layout';
import { tan } from '../../../../constants/colors';
import { HistoryDetailsProps } from '../../../../types/propTypes';
import { Recommendation } from '../../../../types/recommendation';
import { Button } from '../../../../components';
import { FontAwesome } from '@expo/vector-icons';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/core';
import Review from '../../../../components/HistoryDetails/Review';
import Tabs from '../../../../components/HistoryDetails/Tabs';

const { width } = Dimensions.get('window');

export default function HistoryDetails({
  route,
  navigation,
}: HistoryDetailsProps) {
  const { item } = route.params;
  const [imageSelected, setImageSelected] = useState(true);

  const buttonOpacity = useSharedValue(0);
  const mapOffset = useSharedValue(0);

  const isFocused = useIsFocused();

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  const switchMapImage = () => {
    if (imageSelected) {
      mapOffset.value = withTiming(-width + 48);
    } else {
      mapOffset.value = withTiming(0);
    }
    setImageSelected((v) => !v);
  };

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: mapOffset.value }],
  }));

  useEffect(() => {
    if (!isFocused) {
      buttonOpacity.value = withTiming(0, {
        duration: 0,
      });
    } else {
      buttonOpacity.value = withDelay(
        450,
        withTiming(1, { duration: 100, easing: Easing.quad })
      );
    }
  }, [isFocused]);

  return (
    <ScrollLayout>
      <View style={styles.imageMap}>
        <Animated.View
          style={[
            { flexDirection: 'row', width: 2 * (width - 48), aspectRatio: 3 },
            imageAnimatedStyle,
          ]}>
          <SharedElement id={`${item.id}.image`}>
            <Image
              source={{ uri: `${item.image}?${item.image_updated}` }}
              style={styles.image}
              resizeMode="cover"
            />
          </SharedElement>
          <MapView
            initialRegion={{
              latitude: item.location.lat,
              longitude: item.location.lon,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            }}
            style={styles.map}>
            <Marker
              coordinate={{
                latitude: item.location.lat,
                longitude: item.location.lon,
              }}
            />
          </MapView>
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              right: 0,
            },
            buttonAnimatedStyle,
          ]}>
          <TouchableOpacity
            style={{
              backgroundColor: '#00000080',
              width: 56,
              height: 56,
              borderTopLeftRadius: 24,
              borderBottomRightRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={28} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#00000080',
              width: 56,
              height: 56,
              borderTopRightRadius: 24,
              borderBottomLeftRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}
            activeOpacity={0.7}
            onPress={() => switchMapImage()}>
            <FontAwesome
              name={imageSelected ? 'map-signs' : 'image'}
              size={28}
              color="#FFF"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Text category="h2" style={{ marginTop: 10 }}>
        {item.name}
      </Text>
      <Text style={{ marginBottom: 10 }} category="h6">
        {item.desc}
      </Text>
      <Text category="s1">{item.address}</Text>

      <Tabs recommendation={item} />
    </ScrollLayout>
  );
}

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    borderRadius: 24,
    aspectRatio: 1.5,
    width: width - 48,
  },
  imageMap: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  map: {
    width: width - 48,
    aspectRatio: 1.5,
    backgroundColor: 'red',
    borderRadius: 24,
  },
});
