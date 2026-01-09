import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import AppHeader from '@/components/AppHeader';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SellerInsightsScreen() {
  const router = useRouter();
  // Mock Data
  const incomingOrders = [
    {
      id: '1',
      customer: 'Alice Johnson',
      time: '2:30 PM',
      distance: '0.5 miles',
      status: 'Pending',
      items: '2x Spicy Jollof Rice with Chicken',
      price: '$25.98',
      address: '456 Nearby Street, Downtown',
      instructions: 'Extra spicy please',
    },
    {
      id: '2',
      customer: 'Bob Smith',
      time: '3:15 PM',
      distance: '1.2 miles',
      status: 'Preparing',
      items: '1x Vegetable Fried Rice',
      price: '$12.00',
      address: '123 Main St, Uptown',
      instructions: '',
    },
  ];
  const foodPerformance = [
    {
      name: 'Spicy Jollof Rice with Chicken', price: '$12.99', total: 124, week: 18, lastOrder: 'May 4, 2025, 03:30 PM', prep: '35 min', status: 'Trending',
    },
    {
      name: 'Homemade Beef Burgers', price: '$9.99', total: 87, week: 12, lastOrder: 'May 3, 2025, 06:45 PM', prep: '25 min', status: 'Regular',
    },
    {
      name: 'Vegetable Fried Rice', price: '$8.99', total: 65, week: 9, lastOrder: 'May 2, 2025, 02:20 PM', prep: '30 min', status: 'Regular',
    },
    {
      name: 'Grilled Tilapia with Pepper Sauce', price: '$14.99', total: 102, week: 22, lastOrder: 'May 4, 2025, 07:15 PM', prep: '40 min', status: 'Trending',
    },
  ];
  const summary = {
    totalOrders: 378,
    bestSeller: 'Spicy Jollof Rice with Chicken',
    trending: 2,
  };

  return (
    <View style={styles.container}>
      <AppHeader logo={require('@/assets/images/logo.png')} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Dashboard Title */}
        <Text style={styles.pageTitle}>My Foods Dashboard</Text>

        {/* Incoming Orders Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <FontAwesome name="user-o" size={20} color="#222" style={{marginRight: 6}} />
            <Text style={styles.sectionTitle}>Incoming Orders</Text>
            <View style={styles.activeOrdersBadge}><Text style={styles.activeOrdersBadgeText}>3 Active Orders</Text></View>
          </View>
          {incomingOrders.map((order, i) => (
            <View key={order.id} style={[styles.orderCard, i === 0 && styles.orderCardActive]}> 
              <View style={styles.orderHeaderRow}>
                <FontAwesome name="user" size={14} color="#555" style={{marginRight: 3}} />
                <Text style={styles.orderHeaderText}>{order.customer}</Text>
                <FontAwesome name="clock-o" size={14} color="#555" style={{marginLeft: 10, marginRight: 3}} />
                <Text style={styles.orderHeaderText}>{order.time}</Text>
                <FontAwesome name="map-marker" size={14} color="#555" style={{marginLeft: 10, marginRight: 3}} />
                <Text style={styles.orderHeaderText}>{order.distance} away</Text>
                <View style={[styles.statusBadge, order.status === 'Pending' ? styles.pending : styles.preparing]}>
                  <Text style={[styles.statusBadgeText, order.status === 'Pending' ? styles.pendingText : styles.preparingText]}>{order.status}</Text>
                </View>
              </View>
              <Text style={styles.orderLabel}>Items:</Text>
              <Text style={styles.orderValue}>{order.items}</Text>
              <Text style={styles.orderLabel}>Total:</Text>
              <Text style={styles.orderValue}>{order.price}</Text>
              <Text style={styles.orderLabel}>Delivery Address:</Text>
              <Text style={styles.orderValue}>{order.address}</Text>
              <Text style={styles.orderLabel}>Special Instructions:</Text>
              <Text style={styles.orderInstructions}>{order.instructions || 'None'}</Text>
              <View style={styles.orderActionRow}>
                <TouchableOpacity style={styles.actionBtn}><FontAwesome name="phone" size={16} color="#222" /><Text style={styles.actionBtnText}> Call Customer</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtnOutline}><FontAwesome name="map" size={16} color="#3a6cf6" /><Text style={styles.actionBtnOutlineText}> Live Location</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtnPrimary}><Text style={styles.actionBtnPrimaryText}>Start Preparing</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Food Performance Overview */}
        <Text style={styles.sectionTitle}>Food Performance Overview</Text>
        <View style={styles.tableCard}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.tableHeader}>Food Item</Text>
            <Text style={styles.tableHeader}>Price</Text>
            <Text style={styles.tableHeader}>Orders</Text>
            <Text style={styles.tableHeader}>Week</Text>
            <Text style={styles.tableHeader}>Last Order</Text>
            <Text style={styles.tableHeader}>Prep</Text>
            <Text style={styles.tableHeader}>Status</Text>
          </View>
          {foodPerformance.map((item, idx) => (
            <View key={item.name} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.price}</Text>
              <Text style={styles.tableCell}>{item.total}</Text>
              <Text style={styles.tableCell}>{item.week}</Text>
              <Text style={styles.tableCell}>{item.lastOrder}</Text>
              <Text style={styles.tableCell}>{item.prep}</Text>
              <View style={[styles.trendBadge, item.status === 'Trending' ? styles.trending : styles.regular]}>
                <Text style={[styles.trendBadgeText, item.status === 'Trending' ? styles.trendingText : styles.regularText]}>{item.status === 'Trending' ? 'Trending' : 'Regular'}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Performance Summary */}
        <Text style={styles.sectionTitle}>Performance Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Orders</Text>
            <Text style={styles.summaryValue}>{summary.totalOrders}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Best Seller</Text>
            <Text style={styles.summaryValue}>{summary.bestSeller}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Trending Items</Text>
            <Text style={styles.summaryValue}>{summary.trending}</Text>
          </View>
        </View>
      </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/(seller)/addItem')}>
        <FontAwesome name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    position: 'relative',
  },
  scrollContent: {
    paddingBottom: 90,
    paddingHorizontal: 8,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#181818',
    paddingHorizontal: 8,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 18,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 8,
  },
  activeOrdersBadge: {
    backgroundColor: '#eaf2ff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 6,
  },
  activeOrdersBadgeText: {
    color: '#3a6cf6',
    fontWeight: '600',
    fontSize: 12,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ededed',
  },
  orderCardActive: {
    borderColor: '#ff8a3a',
    backgroundColor: '#fffdfa',
    shadowColor: '#ff8a3a',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  orderHeaderText: {
    fontSize: 13,
    color: '#222',
    marginRight: 2,
    fontWeight: '500',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 'auto',
    marginRight: 0,
    alignSelf: 'flex-end',
  },
  pending: {
    backgroundColor: '#fff9d6',
  },
  preparing: {
    backgroundColor: '#eaf2ff',
  },
  statusBadgeText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  pendingText: {
    color: '#bfa100',
  },
  preparingText: {
    color: '#3a6cf6',
  },
  orderLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
    color: '#222',
  },
  orderValue: {
    fontSize: 14,
    color: '#181818',
    marginBottom: 2,
    marginLeft: 2,
  },
  orderInstructions: {
    fontStyle: 'italic',
    color: '#888',
    fontSize: 13,
    marginBottom: 6,
    marginLeft: 2,
  },
  orderActionRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 8,
    flexWrap: 'wrap',
  },
  actionBtn: {
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  actionBtnText: {
    color: '#181818',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 3,
  },
  actionBtnOutline: {
    borderWidth: 1.5,
    borderColor: '#3a6cf6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
    backgroundColor: '#fff',
  },
  actionBtnOutlineText: {
    color: '#3a6cf6',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 3,
  },
  actionBtnPrimary: {
    backgroundColor: '#ff8a3a',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtnPrimaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 18,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 2,
    marginBottom: 6,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 13,
    color: '#444',
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
    color: '#222',
    textAlign: 'left',
  },
  trendBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  trending: {
    backgroundColor: '#ffede1',
  },
  trendingText: {
    color: '#ff8a3a',
    fontWeight: 'bold',
    fontSize: 12,
  },
  regular: {
    backgroundColor: '#f0f4f8',
  },
  regularText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 12,
  },
  trendBadgeText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 26,
    marginTop: 4,
    paddingHorizontal: 2,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181818',
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    backgroundColor: '#ff8a3a',
    borderRadius: 32,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff8a3a',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 99,
  },
});
