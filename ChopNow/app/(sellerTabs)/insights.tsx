import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function SellerInsightsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'My Insights' }} />
      <Text style={styles.text}>Seller Insights Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
