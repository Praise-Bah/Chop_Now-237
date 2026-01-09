import { Stack } from 'expo-router';

// Main layout for the seller group - uses a Stack to manage navigation
export default function SellerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Screens that should NOT have the tab bar */}
      {/* Screens that should NOT have the tab bar or default swipe gesture */}
      <Stack.Screen name="business-profile" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="addItem" options={{ title: 'Add New Item/Video', presentation: 'modal' }} />
      
      {/* Screens with swipe-back gesture enabled */}
      <Stack.Screen name="settings" options={{ gestureEnabled: true, headerShown: false }} />
      <Stack.Screen name="profile" options={{ gestureEnabled: true, headerShown: false }} />
      
      {/* The (tabs) group has its own _layout.tsx file that defines the tab bar */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
