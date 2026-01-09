import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" options={{ animation: 'none' }} />
        <Stack.Screen name="login" />
        <Stack.Screen name="role" />
        <Stack.Screen name="seller-signup" />
        <Stack.Screen name="buyer-signup" />
        <Stack.Screen name="verification" />
      </Stack>
    </>
  );
}
