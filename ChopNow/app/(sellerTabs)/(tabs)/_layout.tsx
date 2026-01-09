import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Platform, View, Text, StyleSheet } from 'react-native';

// This component defines the tab bar for the main seller screens
export default function SellerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6347', // Tomato color for active label
        tabBarInactiveTintColor: 'black', // Color for inactive label
        tabBarStyle: {
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'ios' ? 5 : 0,
          height: Platform.OS === 'ios' ? 90 : 70, // Adjusted height for better spacing
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
        tabBarLabelStyle: {
          fontSize: 11, // Slightly smaller font for labels
          fontWeight: '600', // Semi-bold
          marginBottom: Platform.OS === 'ios' ? -5 : 5, // Adjust label position
        },
        headerShown: false, // We use custom headers in individual screens
      }}
    >
      <Tabs.Screen
        name="index" // Corresponds to app/(seller)/(tabs)/index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.inactiveIconContainer}>
              <FontAwesome name="home" size={24} color={focused ? 'white' : 'black'} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#FF6347' : 'black', fontSize: 11, fontWeight: '600', marginBottom: Platform.OS === 'ios' ? -5 : 5 }}>Home</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.inactiveIconContainer}>
              <FontAwesome name="shopping-bag" size={22} color={focused ? 'white' : 'black'} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#FF6347' : 'black', fontSize: 11, fontWeight: '600', marginBottom: Platform.OS === 'ios' ? -5 : 5 }}>Orders</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.inactiveIconContainer}>
              <FontAwesome name="bar-chart" size={22} color={focused ? 'white' : 'black'} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#FF6347' : 'black', fontSize: 11, fontWeight: '600', marginBottom: Platform.OS === 'ios' ? -5 : 5 }}>Insights</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Alerts', // Changed from 'Notifications' to 'Alerts' to match common shorter tab names
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIconContainer : styles.inactiveIconContainer}>
              <FontAwesome name="bell" size={22} color={focused ? 'white' : 'black'} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#FF6347' : 'black', fontSize: 11, fontWeight: '600', marginBottom: Platform.OS === 'ios' ? -5 : 5 }}>Alerts</Text>
          ),
        }}
      />
    </Tabs>
  );
}

// Styles for the icon container to achieve the background color effect
const styles = StyleSheet.create({
  activeIconContainer: {
    backgroundColor: '#FF6347', // Tomato color for the background of the active icon
    paddingHorizontal: 16, // Horizontal padding
    paddingVertical: 8,    // Vertical padding to make it rectangular
    borderRadius: 12,      // Rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto', // Auto width based on padding
    minWidth: 50, // Minimum width
    height: 40, // Fixed height
    marginTop: 5, // Add some margin to push it up a bit from the label
  },
  inactiveIconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    minWidth: 50,
    height: 40,
    marginTop: 5,
  },
});
