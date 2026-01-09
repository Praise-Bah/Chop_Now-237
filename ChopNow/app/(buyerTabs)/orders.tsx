import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import AppHeader from '@/components/AppHeader';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

type OrderStatus = 'Processing' | 'Completed' | 'Cancelled' | 'Delivered';

interface Order {
  id: string;
  status: OrderStatus;
  date: string;
  total: string;
  items: string;
  food: string;
  seller: string;
  sellerImage: string | null;
}

// Sample data for orders
const ACTIVE_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    status: 'Processing',
    date: 'May 3, 12:00 PM',
    total: '$25.98',
    items: '2 items',
    food: 'Spicy Jollof Rice with Chicken',
    seller: 'Chef Amaka',
    sellerImage: null
  }
];

const PAST_ORDERS: Order[] = [
  {
    id: 'ORD-002',
    status: 'Completed',
    date: 'May 1, 6:30 PM',
    total: '$9.99',
    items: '1 item',
    food: 'Homemade Beef Burgers',
    seller: 'Burger Master',
    sellerImage: null
  },
  {
    id: 'ORD-003',
    status: 'Cancelled',
    date: 'Apr 29, 7:00 PM',
    total: '$25.50',
    items: '3 items',
    food: 'Vegetable Stir Fry',
    seller: 'Green Gourmet',
    sellerImage: null
  }
];

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'past'
  
  const getStatusColor = (status: OrderStatus): string => {
    switch(status) {
      case 'Processing':
        return '#F0E68C'; // Khaki
      case 'Completed':
        return '#90EE90'; // Light Green
      case 'Cancelled':
        return '#FFA07A'; // Light Salmon
      default:
        return '#E0E0E0'; // Light Gray
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderDate}>{item.date}</Text>
          <Text style={styles.orderTotal}>{item.total}</Text>
          <Text style={styles.orderItems}>{item.items}</Text>
        </View>
      </View>
      
      <View style={styles.foodDetails}>
        <View style={styles.sellerImageContainer}>
          {item.sellerImage ? (
            <Image source={{ uri: item.sellerImage }} style={styles.sellerImage} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.food}</Text>
          <Text style={styles.sellerName}>By {item.seller}</Text>
        </View>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader userType="buyer" searchBar={false} />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'active' && styles.activeTabButton]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active ({ACTIVE_ORDERS.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'past' && styles.activeTabButton]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past ({PAST_ORDERS.length})
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={activeTab === 'active' ? ACTIVE_ORDERS : PAST_ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 15,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  listContent: {
    padding: 15,
    paddingTop: 5,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    marginBottom: 15,
  },
  orderIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderItems: {
    fontSize: 14,
    color: '#666',
  },
  foodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  sellerImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  sellerImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 14,
    color: '#666',
  },
  detailsButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
