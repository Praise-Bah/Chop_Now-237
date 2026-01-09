import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function SellerNotificationsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'My Notifications' }} />
      <Text style={styles.text}>Seller Notifications Screen</Text>
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
