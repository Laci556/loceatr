import React, { useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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

type Rating = 1 | 2 | 3 | 4 | 5 | null;

interface ReviewInputProps {
  question: string;
  onRating: (r: Rating) => void;
  rating: Rating;
}

interface ReviewProps {}

const yellow = '#F7D046FF';
const transparent = '#F7D04600';

function ReviewButton({
  onPress,
  rating,
  selected,
}: {
  onPress: () => void;
  rating: number;
  selected: boolean;
}) {
  const bg = useSharedValue(yellow);
  const fontSize = useSharedValue(15);
  const textStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(bg.value),
  }));
  const fontStyle = useAnimatedStyle(() => ({
    fontSize: withTiming(fontSize.value, {
      easing: Easing.quad,
      duration: 100,
    }),
  }));

  useEffect(() => {
    if (selected) {
      bg.value = yellow;
      fontSize.value = 20;
    } else {
      bg.value = transparent;
      fontSize.value = 16;
    }
  }, [selected]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Animated.View
        style={[
          {
            borderRadius: 100,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          },
          textStyle,
        ]}>
        <Animated.Text
          style={[{ fontFamily: 'HKGrotesk-SemiBold' }, fontStyle]}>
          {rating}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// function ReviewInput({ question, onRating, rating }: ReviewInputProps) {
//   const ratings: Rating[] = [1, 2, 3, 4, 5];

//   return (
//     <View style={{ marginTop: 10 }}>
//       <Text category="h6">{question}</Text>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           // backgroundColor: 'red',
//         }}>
//         {ratings.map((i) => (
//           <ReviewButton
//             onPress={() => onRating(i)}
//             key={`${i}`}
//             rating={i ?? 0}
//             selected={rating == i}
//           />
//         ))}
//       </View>
//     </View>
//   );
// }

function ReviewInput({ question, onRating, rating }: ReviewInputProps) {
  const ratings: Rating[] = [1, 2, 3, 4, 5];
  const sliding = useSharedValue(0);
  const [sliderValue, setSliderValue] = useState(3.5);
  const [roundedRating, setRoundedRating] = useState(3.5);
  const emojis = ['🤮', '☹️', '😐', '😀', '😍'];

  const emojiStyle = useAnimatedStyle(() => ({
    opacity: withTiming(sliding.value),
  }));

  const renderAboveThumbComponent = () => {
    return (
      <Animated.View
        style={[
          emojiStyle,
          {
            backgroundColor: '#3f3f3f',
            width: 50,
            height: 50,
            // left: -12.5,
            right: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          },
        ]}>
        <Text style={{ fontSize: 18 }}>{emojis[roundedRating - 1]}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={{ marginTop: 8 }}>
      <Text style={{ fontFamily: 'HKGrotesk-SemiBold', fontSize: 17 }}>
        {question}
      </Text>
      <Slider
        renderAboveThumbComponent={renderAboveThumbComponent}
        onSlidingStart={() => (sliding.value = 1)}
        onSlidingComplete={() => (sliding.value = 0)}
        onValueChange={(v) => {
          setSliderValue(v as number);
          setRoundedRating(Math.floor(v as number));
        }}
        maximumValue={5.99}
        minimumValue={1}
        value={sliderValue}
        trackStyle={{ backgroundColor: '#3f3f3f' }}
      />
    </View>
  );
}

export default function Review({}: ReviewProps) {
  const [items, setItems] = useState<number[]>([]);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [selectHeight, setSelectHeight] = useState(0);
  const [showSelect, setShowSelect] = useState(true);

  const selectOpacity = useSharedValue(1);
  const selectStyle = useAnimatedStyle(() => ({
    opacity: selectOpacity.value,
    // zIndex: interpolate(selectOpacity.value, [0, 1], [0, 10]),
  }));

  const questions = [
    'az étel minősége?',
    'a hely hangulata?',
    'stp1',
    'stp2',
    'stp3',
  ];
  const [ratings, setRatings] = useState<Rating[]>(questions.map(() => null));

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

  return (
    <View>
      {/* <Animated.View
        style={[
          selectStyle,
          { marginBottom: -selectHeight, marginTop: 20, zIndex: 10 },
        ]} 
         onLayout={(e) => setSelectHeight(e.nativeEvent.layout.height)}>
    */}
      {showSelect && (
        <Animated.View style={selectStyle}>
          <Text category="h5">meglátogattad a helyet?</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelected(true)}>
              <Text
                category="h6"
                style={{ opacity: selected === null || selected ? 1 : 0.5 }}>
                igen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              activeOpacity={0.8}
              onPress={() => setSelected(false)}>
              <Text
                category="h6"
                style={{ opacity: selected === null || !selected ? 1 : 0.5 }}>
                nem
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      {/* </Animated.View> */}

      <View>
        {/* <FadeIn show={!!selected}>
          <Text category="h5">milyen volt...</Text>
          </FadeIn>
          <View>
          {questions.map((q, i) => (
            <FadeIn
            delayMS={i * 100 + 100}
            delayTotal={questions.length * 100 + 100}
            key={q}
            show={selected ?? false}>
            <ReviewInput
            onRating={(r) =>
                  setRatings((ratings) => {
                    let newRatings = [...ratings];
                    newRatings[i] = r;
                    return newRatings;
                  })
                }
                question={q}
                rating={ratings[i]}
              />
            </FadeIn>
          ))}
        </View> */}
        <FadeIn delayMS={100} delayTotal={0} show={selected ?? false}>
          <Text>hogy értékelnéd összességében a helyet?</Text>
        </FadeIn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
