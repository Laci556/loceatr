import React, { useEffect, useState } from 'react';
import { Input, Text } from '@ui-kitten/components';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text as NativeText,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  interpolateColors,
  processColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Button } from '..';
import FadeIn from '../FadeIn';
import { Slider } from '@miblanchard/react-native-slider';
import { supabase } from '../../initSupabase';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import hu from 'dayjs/locale/hu';
dayjs.extend(relativeTime);
dayjs.locale(hu);

interface ReviewProps {
  placeID: number;
}

const yellow = '#F7D046FF';
const transparent = '#F7D04600';

export default function Review({ placeID }: ReviewProps) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [showSelect, setShowSelect] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [alreadyReviewed, setAlreadyReviewed] = useState<null | {
    body: string;
    created_at: string;
  }>(null);

  const selectOpacity = useSharedValue(1);
  const selectStyle = useAnimatedStyle(() => ({
    opacity: selectOpacity.value,
    // zIndex: interpolate(selectOpacity.value, [0, 1], [0, 10]),
  }));

  const hideSelect = () => {
    setShowSelect(false);
  };

  useEffect(() => {
    if (selected) {
      selectOpacity.value = withTiming(0, { duration: 100 }, (isFinished) => {
        if (isFinished) runOnJS(hideSelect)();
      });
    }
  }, [selected]);

  const sendReview = async () => {
    const { data, error } = await supabase.from('reviews').insert({
      user_id: supabase.auth.user()?.id,
      body: reviewText,
      place_id: placeID,
    });
    console.log(error, data);
    if (!error && data) {
      setAlreadyReviewed({ body: reviewText, created_at: data[0].created_at });
    }
  };

  const fetchReview = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('body, created_at')
      .eq('place_id', placeID)
      .eq('user_id', supabase.auth.user()?.id);

    console.log(data, error);

    if (data) {
      setAlreadyReviewed({
        body: data[0].body,
        created_at: data[0].created_at,
      });
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <View style={{ paddingHorizontal: 8 }}>
      {alreadyReviewed ? (
        <>
          <Text style={{ fontFamily: 'HKGrotesk-SemiBold', fontSize: 18 }}>
            ezt írtad a helyről {dayjs(alreadyReviewed.created_at).fromNow()}
          </Text>
          <Text
            style={{
              marginVertical: 18,
              fontSize: 16,
              paddingHorizontal: 5,
              fontFamily: 'HKGrotesk-Italic',
            }}>
            {alreadyReviewed.body}
          </Text>
        </>
      ) : (
        <>
          {showSelect && (
            <Animated.View style={selectStyle}>
              <Text category="h5">meglátogattad a helyet?</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelected(true)}>
                  <Text
                    category="h6"
                    style={{
                      opacity: selected === null || selected ? 1 : 0.5,
                    }}>
                    igen
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  activeOpacity={0.8}
                  onPress={() => setSelected(false)}>
                  <Text
                    category="h6"
                    style={{
                      opacity: selected === null || !selected ? 1 : 0.5,
                    }}>
                    nem
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
          <View>
            <FadeIn delayMS={100} delayTotal={0} show={selected ?? false}>
              <Text style={{ fontSize: 17 }}>
                hogy értékelnéd összességében a helyet?
              </Text>
              <TextInput
                style={styles.textInput}
                multiline={true}
                textAlignVertical="top"
                value={reviewText}
                onChangeText={setReviewText}
              />
              <Button
                label="küldés"
                onPress={sendReview}
                style={{ marginTop: 10, width: 120, alignSelf: 'flex-end' }}
              />
            </FadeIn>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#ffffffaa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 20,
    minHeight: 100,
    maxHeight: 180,
    fontFamily: 'HKGrotesk-Medium',
    fontSize: 15,
  },
});
