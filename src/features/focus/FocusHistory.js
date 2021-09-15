import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { spacing, fontSizes } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => onClear();

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        <Text style={styles.title}>{"Thins we've focused on"}</Text>
        {focusHistory?.length ? (
          <>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        ) : (
          <Text>Nothing to show</Text>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? '#f00' : '#0f0',
    fontSizes: fontSizes.md,
  }),
  title: {
    color: '#fff',
    fontSize: fontSizes.lg,
    textAlign: 'center',
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.lg,
  },
});
