import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Timing } from './Timing';
import { Countdown } from '../../components/CountdownTimer';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { spacing, fontSizes } from '../../utils/sizes';

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(0.05);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (prgrs) => {
    setProgress(prgrs);
  };

  const changeTime = (min) => {
    resetCountdown(min);
  };

  const onEnd = (min) => {
    vibrate(3);
    resetCountdown(min);
    onTimerEnd();
  };


  const resetCountdown = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = (seconds) => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => {
        Vibration.vibrate(), 1000;
      });
      setTimeout(() => clearInterval(interval, seconds * 1000));
    } else {
      Vibration.vibrate(seconds * 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar
          color="#5E84E2"
          style={{ height: spacing.sm }}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} title="X" onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.md,
    // alignItems: "center",
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.md,
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.xl,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: spacing.md,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  clearSubject: {
    paddingBottom: spacing.lg,
    paddingLeft: spacing.xxl,
    textAlign: 'center',
    heigth: spacing.lg,
  },
});
