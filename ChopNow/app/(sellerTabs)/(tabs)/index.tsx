import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Animated } from 'react-native';
import { Text } from '@/components/Themed';
import AppHeader from '@/components/AppHeader';
import { FontAwesome } from '@expo/vector-icons';
import { router, useFocusEffect, useRouter } from 'expo-router';

// Interfaces (copied from app/(tabs)/index.tsx)
interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: any;
  chef: string;
  location: string;
  hours: string;
  platesLeft: number;
  distance: string;
  deliveryTime: string;
  rating: number;
}

interface VideoItem {
  id: string;
  videoUrl: string;
  foodId: string; // Reference to the corresponding food item
  title: string;
  chef: string;
  views: string;
  thumbnail?: any;
}

// Placeholder data (copied from app/(tabs)/index.tsx - replace with actual seller data later)
const FOOD_ITEMS_DATA: FoodItem[] = [
  {
    id: '1',
    name: 'Spicy Jollof Rice with Chicken',
    price: 12.99,
    image: require('@/assets/images/partial-react-logo.png'),
    chef: 'Chef Amaka',
    location: 'Downtown',
    hours: '12:00 PM - 8:00 PM',
    platesLeft: 15,
    distance: '800m away',
    deliveryTime: 'Delivery in 1d',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Homemade Beef Burgers',
    price: 9.99,
    image: require('@/assets/images/partial-react-logo.png'),
    chef: 'Burger Master',
    location: 'Westside',
    hours: '11:00 AM - 6:00 PM',
    platesLeft: 8,
    distance: '1.2km away',
    deliveryTime: 'Delivery in 1d',
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Vegetable Stir Fry',
    price: 8.50,
    image: require('@/assets/images/partial-react-logo.png'),
    chef: 'Green Gourmet',
    location: 'Eastside',
    hours: '10:00 AM - 7:30 PM',
    platesLeft: 20,
    distance: '500m away',
    deliveryTime: 'Delivery in 1d',
    rating: 4.8,
  },
];

const VIDEO_DATA: VideoItem[] = [
  {
    id: 'v1',
    foodId: '1',
    videoUrl: 'https://example.com/video1.mp4',
    title: '30sec Commercial | Product Video',
    chef: 'Chef Amaka',
    views: '3M views',
  },
  {
    id: 'v2',
    foodId: '2',
    videoUrl: 'https://example.com/video2.mp4',
    title: '30sec Commercial | Product Video',
    chef: 'Burger Master',
    views: '2M views',
  },
  {
    id: 'v3',
    foodId: '3',
    videoUrl: 'https://example.com/video3.mp4',
    title: '30sec Commercial | Product Video',
    chef: 'Green Gourmet',
    views: '1M views',
  },
];

export default function SellerHomeScreen() {
  const [showVideos, setShowVideos] = useState(false);
  const [fabVisible, setFabVisible] = useState(true); // Initially visible
  const lastScrollY = useRef(0);
  const fabOpacity = useRef(new Animated.Value(1)).current; // For fade animation
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setShowVideos(false);
      const timer = setTimeout(() => {
        setShowVideos(true);
      }, 7000);
      return () => clearTimeout(timer);
    }, [])
  );

  const handleCardPress = (itemId: string) => {
    // Navigation for seller might be different, e.g., to an edit screen
    // For now, let's assume it navigates to a detail view similar to buyer
    router.push(`/food-details/${itemId}` as any); // Placeholder navigation
  };

  const handleFabPress = () => {
    // Navigate to screen for adding new item/video
    console.log('FAB Pressed - Navigate to Add Item Screen');
    router.push('/(seller)/addItem');
  };

  const combinedData = FOOD_ITEMS_DATA.map(foodItem => {
    const video = VIDEO_DATA.find(v => v.foodId === foodItem.id);
    return { foodItem, video };
  });

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    if (currentScrollY <= 0) { // At the top
      if (!fabVisible) {
        setFabVisible(true);
        Animated.timing(fabOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    } else if (scrollDirection === 'up') { // Scrolling up
      if (!fabVisible) {
        setFabVisible(true);
        Animated.timing(fabOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    } else if (scrollDirection === 'down') { // Scrolling down
      if (fabVisible) {
        Animated.timing(fabOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setFabVisible(false);
        });
      }
    }

    lastScrollY.current = currentScrollY;
  };

  return (
    <View style={styles.outerContainer}>
      <AppHeader logo={require('@/assets/images/logo.png')} />
      <FlatList
        data={combinedData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.foodCardContainer}
            onPress={() => handleCardPress(item.foodItem.id)}
          >
            <ImageBackground
              source={item.foodItem.image}
              style={styles.foodCardBackground}
              imageStyle={styles.foodCardImage}
            >
              {!showVideos ? (
                <View style={styles.foodCardOverlay}>
                  <Text style={styles.foodName}>{item.foodItem.name}</Text>
                  <View style={styles.priceBadge}>
                    <Text style={styles.foodPrice}>${item.foodItem.price.toFixed(2)}</Text>
                  </View>
                  
                  <View style={styles.foodDetailsContainer}>
                    <View style={styles.foodDetailsRow}>
                      <FontAwesome name="map-marker" size={14} color="white" />
                      <Text style={styles.foodDetailText}>{item.foodItem.location}</Text>
                    </View>
                    <View style={styles.foodDetailsRow}>
                      <FontAwesome name="clock-o" size={14} color="white" />
                      <Text style={styles.foodDetailText}>{item.foodItem.hours}</Text>
                    </View>
                    <View style={styles.foodDetailsRow}>
                      <FontAwesome name="user" size={14} color="white" />
                      <Text style={styles.foodDetailText}>{item.foodItem.chef}</Text>
                    </View>
                    <View style={styles.foodDetailsRow}>
                      <FontAwesome name="cutlery" size={14} color="white" />
                      <Text style={styles.foodDetailText}>{item.foodItem.platesLeft} plates left</Text>
                    </View>
                  </View>
                  
                  <View style={styles.foodMetaContainer}>
                    <Text style={styles.foodMetaText}>{item.foodItem.distance}</Text>
                    <Text style={styles.foodMetaText}>{item.foodItem.deliveryTime}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.videoOverlay}>
                  <View style={styles.videoTitleOverlay}>
                    <Text style={styles.videoTitleText}>{item.video?.title}</Text>
                    <TouchableOpacity style={styles.videoOptionsButton}>
                      <FontAwesome name="ellipsis-v" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.playButtonContainer}>
                    <View style={styles.playButtonCircle}>
                      <FontAwesome name="play" size={24} color="#FF6347" />
                    </View>
                  </View>
                  
                  <View style={styles.videoDurationBadge}>
                    <Text style={styles.videoDurationText}>0:30</Text>
                  </View>
                </View>
              )}
            </ImageBackground>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.foodItem.id}
        contentContainerStyle={styles.listContentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {fabVisible && (
        <Animated.View style={[styles.fabContainer, { opacity: fabOpacity }]}>
            <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
                <FontAwesome name="plus" size={24} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

// Styles (mostly copied from app/(tabs)/index.tsx, with additions for FAB)
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Increased padding to avoid FAB overlap
    paddingTop: 10,
  },
  foodCardContainer: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  foodCardBackground: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  foodCardImage: {
    borderRadius: 10,
  },
  foodCardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'flex-start',
  },
  foodName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 60,
  },
  priceBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  foodPrice: {
    color: 'white',
    fontWeight: 'bold',
  },
  foodDetailsContainer: {
    marginTop: 5,
  },
  foodDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  foodDetailText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 13,
  },
  foodMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  foodMetaText: {
    color: 'white',
    fontSize: 12,
  },
  playButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
  },
  playButtonCircle: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  videoTitleOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  videoTitleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  videoDurationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoDurationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  videoOptionsButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // FAB Styles
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10, // Ensure FAB is on top
  },
  fab: {
    backgroundColor: '#FF6347', // Tomato color, or your app's primary color
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4, // Shadow for iOS
  },
});
