import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (minutes) => minutes * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const interval = React.useRef(null);
  const countdown = (time) =>
    setMillis((time) => {
      if (!time) {
        clearInterval(interval.current);
        return 0;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });

 useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if(!millis) 
        onEnd(minutes);
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countdown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

 


  const hour = Math.floor(millis / 1000 / 60 / 60) % 60;
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(hour)}:{formatTime(minute)}:{formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  text: {
    width: '100%',
    fontSize: fontSizes.xxxl,
    color: colors.white,
    fontWeight: 'bold',
    padding: spacing.lg,
    backgroundColor: colors.lightBlue,
    textAlign: 'center',
  },
});
