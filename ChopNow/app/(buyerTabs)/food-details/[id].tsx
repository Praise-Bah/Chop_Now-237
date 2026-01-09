import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { Text } from '@/components/Themed';
import AppHeader from '@/components/AppHeader';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';

// Placeholder data - this should ideally come from a global state/context or API call
// For now, let's copy a simplified version of FOOD_ITEMS_DATA from index.tsx
// In a real app, you'd fetch this based on the 'id'
const FOOD_ITEMS_DATA = [
  {
    id: '1',
    name: 'Spicy Jollof Rice with Chicken',
    price: 12.99,
    location: 'Downtown',
    hours: '12:00 PM - 8:00 PM',
    chef: 'Chef Amaka',
    description: 'Authentic Nigerian Jollof rice cooked with special spices and served with grilled chicken.',
    image: require('@/assets/images/partial-react-logo.png'), // Placeholder
    videoUrl: 'http://d23dyxeqlo5psn.cloudfront.net/big_buck_bunny.mp4', // Placeholder video
    rating: 4.8,
    availableStock: 15,
    deliveryFee: 2.50,
    serviceFee: 1.00,
  },
  {
    id: '2',
    name: 'Homemade Beef Burgers',
    price: 9.99,
    location: 'Westside',
    hours: '11:00 AM - 6:00 PM',
    chef: 'Burger Master',
    description: 'Juicy homemade beef burgers with fresh veggies and our secret sauce.',
    image: require('@/assets/images/partial-react-logo.png'), // Placeholder
    videoUrl: 'http://d23dyxeqlo5psn.cloudfront.net/big_buck_bunny.mp4',
    rating: 4.5,
    availableStock: 8,
    deliveryFee: 2.00,
    serviceFee: 0.50,
  },
  // Add more items if needed for testing
];

type FoodItemType = typeof FOOD_ITEMS_DATA[0];

export default function FoodDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [foodItem, setFoodItem] = useState<FoodItemType | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const videoRef = React.useRef<Video>(null);

  useEffect(() => {
    if (id) {
      const item = FOOD_ITEMS_DATA.find(item => item.id === id);
      setFoodItem(item);
    }
  }, [id]);

  if (!foodItem) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading food details...</Text>
      </View>
    );
  }

  const totalPrice = (foodItem.price * quantity) + foodItem.deliveryFee + foodItem.serviceFee;

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.outerContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <AppHeader userType="buyer" searchBar={false} />
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            {/* Top Image/Video Placeholder */}
            <View style={styles.imageContainer}>
          <Image source={foodItem.image} style={styles.mainImage} />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{foodItem.rating.toFixed(1)} <FontAwesome name="star" color="#fff" size={14} /></Text>
          </View>
        </View>

        {/* Food Information */}
        <View style={styles.infoSection}>
          <Text style={styles.foodTitle}>{foodItem.name}</Text>
          <View style={styles.detailsRow}>
            <FontAwesome name="user" size={16} color="#555" />
            <Text style={styles.detailText}>Chef {foodItem.chef}</Text>
            <FontAwesome name="map-marker" size={16} color="#555" style={{marginLeft: 15}} />
            <Text style={styles.detailText}>{foodItem.location}</Text>
            <FontAwesome name="clock-o" size={16} color="#555" style={{marginLeft: 15}} />
            <Text style={styles.detailText}>{foodItem.hours}</Text>
          </View>
          <Text style={styles.descriptionText}>{foodItem.description}</Text>
        </View>

        {/* Seller's Video */}
        <View style={styles.videoSection}>
          <Text style={styles.sectionHeader}>30sec Commercial | Product Video</Text>
          <Video
            ref={videoRef}
            style={styles.videoPlayer}
            source={{
              uri: foodItem.videoUrl,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            // onPlaybackStatusUpdate={status => console.log(status)}
          />
           <TouchableOpacity style={styles.videoOptionsButton}>
            <FontAwesome name="ellipsis-v" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Order Details Section */}
        <View style={styles.orderSection}>
          <Text style={styles.sectionHeader}>Order Details</Text>
          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Quantity (Available: {foodItem.availableStock})</Text>
            <TextInput
              style={styles.quantityInput}
              value={String(quantity)}
              onChangeText={(text) => setQuantity(Number(text) || 1)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price ({quantity} plate{quantity > 1 ? 's' : ''})</Text>
            <Text style={styles.priceValue}>${(foodItem.price * quantity).toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceValue}>${foodItem.deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>${foodItem.serviceFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
          </View>

          <Text style={styles.noteLabel}>Note to Seller (optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Any special instructions..."
            multiline
          />

          <TouchableOpacity style={styles.locationButton}>
            <FontAwesome name="map-marker" size={18} color="#000" />
            <Text style={styles.locationButtonText}>Share Live Location</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      {/* Place Order Button (Sticky Footer) */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.placeOrderButton} onPress={() => alert('Order Placed! Total: $' + totalPrice.toFixed(2))}>
          <FontAwesome name="shopping-cart" size={18} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.placeOrderButtonText}>Place Order (${totalPrice.toFixed(2)})</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    <View style={styles.footer}>
      <TouchableOpacity style={styles.placeOrderButton} onPress={() => alert('Order Placed! Total: $' + totalPrice.toFixed(2))}>
        <FontAwesome name="shopping-cart" size={18} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.placeOrderButtonText}>Place Order (${totalPrice.toFixed(2)})</Text>
      </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 80, // Space for the sticky footer
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 99, 71, 0.9)', // Tomato color with opacity
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoSection: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  foodTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  descriptionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  videoSection: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    position: 'relative',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  videoPlayer: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
  },
  videoOptionsButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
    zIndex: 1, // Ensure it's above the video player if needed
  },
  orderSection: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#333',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    width: 60,
    textAlign: 'center',
    fontSize: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 15,
    color: '#555',
  },
  priceValue: {
    fontSize: 15,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 15,
    marginBottom: 20,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc', // Neutral border for Share Location
    backgroundColor: '#fff', // White background for Share Location
    borderRadius: 8,
  },
  locationButtonText: {
    color: '#000', // Black text for Share Location
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  placeOrderButton: {
    backgroundColor: '#FFB366', // Lighter orange for Place Order button
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
