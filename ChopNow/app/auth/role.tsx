import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function RoleSelectionScreen() {
  const handleBuyerSelection = () => {
    router.push('../auth/buyer-signup');
  };

  const handleSellerSelection = () => {
    router.push('../auth/seller-signup');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.logoText}>CHOP NOW Logo</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Choose Your Role</Text>
        <Text style={styles.subtitleText}>
          Let us know how you want to use CHOP NOW
        </Text>

        <TouchableOpacity
          style={styles.roleOption}
          onPress={handleBuyerSelection}
        >
          <View style={[styles.iconContainer, styles.buyerIcon]}>
            <FontAwesome name="shopping-bag" size={24} color="#FF6347" />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>I want to order food</Text>
            <Text style={styles.roleDescription}>
              Browse and order delicious meals
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleOption}
          onPress={handleSellerSelection}
        >
          <View style={[styles.iconContainer, styles.sellerIcon]}>
            <FontAwesome name="cutlery" size={24} color="#4682B4" />
          </View>
          <View style={styles.roleTextContainer}>
            <Text style={styles.roleTitle}>I want to sell food</Text>
            <Text style={styles.roleDescription}>
              Showcase and sell your culinary creations
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  buyerIcon: {
    backgroundColor: 'rgba(255, 99, 71, 0.1)', // Light coral
  },
  sellerIcon: {
    backgroundColor: 'rgba(70, 130, 180, 0.1)', // Light steel blue
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
  },
  goBackButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  goBackText: {
    fontSize: 16,
    color: '#333',
  },
});
