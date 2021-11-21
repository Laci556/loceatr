import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { tan } from '../constants/colors';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function NotYet({ style = {} }: Props) {
  const [gif, setGif] = useState<string>();

  const fetchGif = async () => {
    const results = (
      await (
        await fetch(
          'https://g.tenor.com/v1/search?key=NKNPH8B6O3RZ&q=not%20yet&contentfilter=medium&ar_range=wide&media_filter=minimal&limit=15'
        )
      ).json()
    ).results;

    setGif(
      results.filter((r: any) => !r.content_description.includes('Mango'))[
        Math.floor(Math.random() * 14)
      ].media[0].gif.url
    );
    console.log(gif);
  };

  useEffect(() => {
    fetchGif();
  }, []);

  return (
    <View style={[{ flex: 1, aspectRatio: 1.3, ...styles.view }, style]}>
      {gif && (
        <Image source={{ uri: gif }} style={{ flex: 1 }} resizeMode="cover" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    borderRadius: 20,
    overflow: 'hidden',
  },
});
