import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function SellerNotificationsScreen() {
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Food Item Available',
      message: 'Chef John has added Spicy Jollof Rice to their menu!',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      title: 'Order Delivered',
      message: 'Your order #1234 has been marked as delivered',
      time: '5 hours ago',
      read: true
    },
    {
      id: '3',
      title: 'New Order Received',
      message: 'You have received a new order #1235 for Jollof Rice',
      time: '1 day ago',
      read: true
    },
    {
      id: '4',
      title: 'Payment Received',
      message: 'Payment of $24.99 has been credited to your account',
      time: '2 days ago',
      read: true
    }
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Notification Panel Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <FontAwesome name="bell" size={24} style={styles.bellIcon} />
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <FontAwesome name="times" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      
      {/* Notifications List */}
      <ScrollView style={styles.notificationsList}>
        {notifications.map((notification) => (
          <View 
            key={notification.id} 
            style={[styles.notificationItem, notification.read ? styles.readNotification : styles.unreadNotification]}
          >
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginRight: 10,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  unreadNotification: {
    backgroundColor: '#f8f8f8',
  },
  readNotification: {
    backgroundColor: '#fff',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});
