import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: '1',
    title: 'New Food Item Available',
    message: 'Chef John has added Spicy Jollof Rice to their menu!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    title: 'Order Delivered',
    message: 'Your order #1234 has been marked as delivered',
    time: '5 hours ago',
    read: true,
  },
  {
    id: '3',
    title: 'Special Offer!',
    message: 'Get 20% off on all burgers today only from Burger Master.',
    time: '1 day ago',
    read: false,
  },
];

export default function NotificationsScreen() {
  const renderNotification = ({ item }: { item: NotificationItem }) => (
    <View style={[styles.notificationItem, !item.read && styles.unreadItem]}>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {/* This close button is for the slide-out panel, not the tab screen header */}
        {/* <TouchableOpacity style={styles.closeButton}>
          <FontAwesome name="times" size={20} color="#000" />
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={NOTIFICATIONS_DATA}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60, // Adjust as needed for status bar
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // closeButton: { // Style for a potential close button if it were a modal/slide-out
  //   padding: 5,
  // },
  listContainer: {
    paddingVertical: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  unreadItem: {
    backgroundColor: '#f8f9fa', // Slightly different background for unread
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6347', // Coral color for unread dot
    marginLeft: 10,
  },
});
