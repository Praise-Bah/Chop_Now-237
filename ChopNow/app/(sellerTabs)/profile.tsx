import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from '@/components/Themed';
import AppHeader from '@/components/AppHeader';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SellerProfileScreen() {
  const router = useRouter();
  
  // Mock data for seller profile
  const sellerProfile = {
    name: "John's Kitchen",
    avatar: "JK",
    isVerified: true,
    isReady: true,
    rating: 0,
    points: 800,
    hours: "12:00 PM - 8:00 PM",
    address: "123 Cooking Street, Foodville",
    foodItems: [
      {
        id: 1,
        name: "Jollof Rice",
        price: 10.99,
        image: null,
        platesLeft: 15,
        duration: "24h duration"
      },
      {
        id: 2,
        name: "Fried Chicken",
        price: 8.99,
        image: null,
        platesLeft: 20,
        duration: "48h duration"
      }
    ],
    orders: [
      {
        id: 1,
        customer: "Alice",
        distance: "0.5 mi",
        items: 2,
        total: 24.99
      },
      {
        id: 2,
        customer: "Bob",
        distance: "1.2 mi",
        items: 1,
        total: 15.50
      },
      {
        id: 3,
        customer: "Charlie",
        distance: "2.5 mi",
        items: 3,
        total: 32.75
      }
    ],
    stats: {
      totalOrders: 3,
      totalProducts: 2,
      totalRevenue: 73.24
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader logo searchBar menuButton />
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{sellerProfile.avatar}</Text>
            {sellerProfile.isReady && (
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Ready</Text>
              </View>
            )}
            <TouchableOpacity style={styles.editButton}>
              <FontAwesome name="plus" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.profileName}>{sellerProfile.name}</Text>
          
          {sellerProfile.isVerified && (
            <View style={styles.verifiedBadge}>
              <FontAwesome name="check" size={10} color="#3a6cf6" style={{marginRight: 4}} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
          
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome 
                key={star} 
                name="star-o" 
                size={18} 
                color="#ddd" 
                style={{marginHorizontal: 2}} 
              />
            ))}
            <Text style={styles.pointsText}>({sellerProfile.points} points)</Text>
          </View>
          
          <View style={styles.infoRow}>
            <FontAwesome name="clock-o" size={16} color="#666" style={{marginRight: 8}} />
            <Text style={styles.infoText}>{sellerProfile.hours}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={16} color="#666" style={{marginRight: 8}} />
            <Text style={styles.infoText}>{sellerProfile.address}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Food for the Day</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(seller)/addItem')}>
              <FontAwesome name="plus" size={14} color="#fff" style={{marginRight: 6}} />
              <Text style={styles.addButtonText}>Add Food</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.foodItemsContainer}>
            {sellerProfile.foodItems.map((item) => (
              <View key={item.id} style={styles.foodItemCard}>
                <View style={styles.foodImagePlaceholder}>
                  <Text style={styles.foodImageText}>{item.name.substring(0, 1)}</Text>
                </View>
                <View style={styles.foodItemDetails}>
                  <Text style={styles.foodItemName}>{item.name}</Text>
                  <Text style={styles.foodItemPrice}>${item.price}</Text>
                  <Text style={styles.foodItemDuration}>{item.duration}</Text>
                </View>
                <View style={styles.platesLeftBadge}>
                  <Text style={styles.platesLeftText}>{item.platesLeft} plates left</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Orders</Text>
            <View style={styles.orderCountBadge}>
              <Text style={styles.orderCountText}>{sellerProfile.orders.length} Orders</Text>
            </View>
          </View>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, {flex: 1.5}]}>Customer</Text>
            <Text style={[styles.tableHeaderText, {flex: 0.7}]}>Items</Text>
            <Text style={[styles.tableHeaderText, {flex: 1}]}>Total</Text>
            <Text style={[styles.tableHeaderText, {flex: 1}]}>Distance</Text>
            <Text style={[styles.tableHeaderText, {flex: 1.5}]}>Action</Text>
          </View>
          
          {sellerProfile.orders.map((order) => (
            <View key={order.id} style={styles.orderRow}>
              <View style={{flex: 1.5}}>
                <Text style={styles.customerName}>{order.customer}</Text>
                <View style={styles.distanceRow}>
                  <FontAwesome name="map-marker" size={12} color="#888" style={{marginRight: 4}} />
                  <Text style={styles.distanceText}>{order.distance}</Text>
                </View>
              </View>
              <Text style={[styles.orderItemsCount, {flex: 0.7}]}>{order.items}</Text>
              <Text style={[styles.orderTotal, {flex: 1}]}>${order.total}</Text>
              <View style={[styles.distanceBadge, {flex: 1}]}>
                <Text style={styles.distanceBadgeText}>{order.distance}</Text>
              </View>
              <TouchableOpacity style={[styles.deliveredButton, {flex: 1.5}]}>
                <Text style={styles.deliveredButtonText}>Mark Delivered</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Orders</Text>
            <Text style={styles.summaryValue}>{sellerProfile.stats.totalOrders}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Products</Text>
            <Text style={styles.summaryValue}>{sellerProfile.stats.totalProducts}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Revenue</Text>
            <Text style={styles.summaryValue}>${sellerProfile.stats.totalRevenue}</Text>
          </View>
        </View>
        
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff8a3a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ff8a3a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf2ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginBottom: 8,
  },
  verifiedText: {
    color: '#3a6cf6',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pointsText: {
    color: '#888',
    fontSize: 14,
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#ff8a3a',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  foodItemsContainer: {
    gap: 12,
  },
  foodItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  foodImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  foodImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#888',
  },
  foodItemDetails: {
    flex: 1,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  foodItemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ff8a3a',
    marginBottom: 2,
  },
  foodItemDuration: {
    fontSize: 12,
    color: '#888',
  },
  platesLeftBadge: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  platesLeftText: {
    fontSize: 12,
    color: '#666',
  },
  orderCountBadge: {
    backgroundColor: '#eaf2ff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  orderCountText: {
    color: '#3a6cf6',
    fontSize: 12,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  distanceText: {
    fontSize: 12,
    color: '#888',
  },
  orderItemsCount: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  distanceBadge: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  distanceBadgeText: {
    fontSize: 12,
    color: '#666',
  },
  deliveredButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  deliveredButtonText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  summarySection: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 16,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomSpace: {
    height: 30,
  },
});
