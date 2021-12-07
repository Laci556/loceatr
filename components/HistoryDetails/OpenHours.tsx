import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { supabase } from '../../initSupabase';
import { Text } from '@ui-kitten/components';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { toToday } from '../../utils';
dayjs.extend(isBetween);

interface OpenHoursProps {
  placeId: number;
}

export default function OpenHours({ placeId }: OpenHoursProps) {
  const [openHours, setOpenHours] = useState<
    {
      opens: string;
      closes: string;
      weekday: number;
      place_id: number;
    }[][]
  >();
  const [nowOpen, setNowOpen] = useState(false);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from<{
        opens: string;
        closes: string;
        weekday: number;
        place_id: number;
      }>('open_hours')
      .select('opens, closes, weekday')
      .eq('place_id', placeId);
    // console.log(data, error);

    let fetched = [];

    if (!data) return;

    for (let i = 1; i <= 7; i++) {
      fetched.push(
        data
          .filter((v) => v.weekday == i)
          .sort((a, b) =>
            dayjs('2021-01-01T' + a.opens).isAfter(
              dayjs('2021-01-01T' + b.opens)
            )
              ? -1
              : 1
          )
      );
    }

    setNowOpen(
      data.filter(
        (d) =>
          d.weekday % 7 == dayjs().day() &&
          dayjs().isBetween(toToday(d.opens), toToday(d.closes))
      ).length > 0
    );

    // console.log(fetched);
    setOpenHours(fetched);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {openHours?.map((day, index) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: index < 6 ? 4 : 0,
          }}
          key={'' + index}>
          <Text
            style={[
              { fontSize: 16 },
              dayjs().day() == (index + 1) % 7 && {
                fontFamily: 'HKGrotesk-Bold',
              },
            ]}>
            {
              [
                'hétfő',
                'kedd',
                'szerda',
                'csütörtök',
                'péntek',
                'szombat',
                'vasárnap',
              ][index]
            }
          </Text>
          <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
            {day.map((entry, index) => (
              <Text
                style={[
                  { fontSize: 16 },
                  dayjs().day() == entry.weekday % 7 && {
                    fontFamily: 'HKGrotesk-Bold',
                  },
                ]}
                key={'e' + index}>
                {entry.opens.slice(0, 5)} - {entry.closes.slice(0, 5)}
              </Text>
            ))}
          </View>
        </View>
      ))}
      <Text style={{ marginTop: 20 }} category="h5">
        most {nowOpen ? 'nyitva' : 'zárva'} vagyunk {nowOpen ? ':)' : ':('}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingHorizontal: 8,
    // backgroundColor: '#ffffff77',
  },
});
