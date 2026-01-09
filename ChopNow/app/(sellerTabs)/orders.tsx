import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

type OrderStatus = 'Processing' | 'Preparing' | 'Ready' | 'Delivered';

interface OrderItem {
  id: string;
  name: string;
  restaurant: string;
  status: OrderStatus;
  price: string;
  date: string;
  time: string;
  itemCount: number;
  estimatedDelivery?: string;
}

export default function SellerOrdersScreen() {
  const [activeTab, setActiveTab] = useState<'Active' | 'Past'>('Active');
  
  const orders: OrderItem[] = [
    {
      id: 'ORD-S001',
      name: 'Grilled Chicken Shawarma',
      restaurant: 'Mediterranean Delights',
      status: 'Processing',
      price: '$11.99',
      date: 'May 4',
      time: '2:30 PM',
      itemCount: 1
    },
    {
      id: 'ORD-S002',
      name: 'Margherita Pizza',
      restaurant: "Tony's Pizzeria",
      status: 'Preparing',
      price: '$14.99',
      date: 'May 4',
      time: '12:15 PM',
      itemCount: 1,
      estimatedDelivery: 'May 4, 1:30 PM'
    }
  ];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Processing': return '#FFD700';
      case 'Preparing': return '#3498db';
      case 'Ready': return '#2ecc71';
      case 'Delivered': return '#7f8c8d';
      default: return '#FFD700';
    }
  };

  const getStatusBackground = (status: OrderStatus) => {
    switch (status) {
      case 'Processing': return 'rgba(255, 215, 0, 0.2)';
      case 'Preparing': return 'rgba(52, 152, 219, 0.2)';
      case 'Ready': return 'rgba(46, 204, 113, 0.2)';
      case 'Delivered': return 'rgba(127, 140, 141, 0.2)';
      default: return 'rgba(255, 215, 0, 0.2)';
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
          />
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="bars" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Orders you've received from customers</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Active' && styles.activeTab]}
          onPress={() => setActiveTab('Active')}
        >
          <Text style={[styles.tabText, activeTab === 'Active' && styles.activeTabText]}>Active (2)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Past' && styles.activeTab]}
          onPress={() => setActiveTab('Past')}
        >
          <Text style={[styles.tabText, activeTab === 'Past' && styles.activeTabText]}>Past (3)</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersList}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusBackground(order.status) }]}>
                <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
              </View>
            </View>
            
            <Text style={styles.orderDate}>{order.date}, {order.time}</Text>
            
            <View style={styles.orderPriceContainer}>
              <Text style={styles.orderPrice}>{order.price}</Text>
              <Text style={styles.itemCount}>{order.itemCount} item</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.foodItemContainer}>
              <View style={styles.foodImageContainer}>
                <View style={styles.foodImage} />
              </View>
              <View style={styles.foodDetails}>
                <Text style={styles.foodName}>{order.name}</Text>
                <Text style={styles.restaurantName}>By {order.restaurant}</Text>
                {order.estimatedDelivery && (
                  <Text style={styles.estimatedDelivery}>Estimated delivery: {order.estimatedDelivery}</Text>
                )}
              </View>
            </View>
            
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  menuButton: {
    padding: 8,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#ff6347',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#333',
  },
  ordersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  orderPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  foodItemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  foodImageContainer: {
    marginRight: 15,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  estimatedDelivery: {
    fontSize: 14,
    color: '#3498db',
  },
  detailsButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
