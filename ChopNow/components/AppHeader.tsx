import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Modal, Platform, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from './Themed';
import { router } from 'expo-router';

interface AppHeaderProps {
  title?: string;
  logo?: any;
  searchBar?: boolean;
  menuButton?: boolean;
  userType: 'buyer' | 'seller'; 
}

export default function AppHeader({ title, logo, searchBar = true, menuButton = true, userType }: AppHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuPress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const navigateToScreen = (screen: string) => {
    setIsMenuVisible(false);
    router.push(screen as any);
  };

  return (
    <View style={styles.container}>
      {title ? (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      ) : logo ? (
        <TouchableOpacity style={styles.logoButtonContainer} onPress={() => router.push(userType === 'buyer' ? '/(buyerTabs)' : '/(sellerTabs)')}>        
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.logoButtonContainer} onPress={() => router.push(userType === 'buyer' ? '/(buyerTabs)' : '/(sellerTabs)')}>        
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
      )}

      {searchBar && (
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      )}

      {menuButton && (
        <TouchableOpacity onPress={handleMenuPress} style={styles.iconButton}>
          <View style={styles.hamburgerMenu}>
            <View style={styles.hamburgerLine}></View>
            <View style={styles.hamburgerLine}></View>
            <View style={styles.hamburgerLine}></View>
          </View>
        </TouchableOpacity>
      )}

      <Modal
        transparent={true}
        visible={isMenuVisible}
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsMenuVisible(false)}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>{userType === 'buyer' ? 'Buyer Account' : 'Seller Account'}</Text>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateToScreen(userType === 'buyer' ? '/(buyerTabs)/profile' : '/(sellerTabs)/profile')}>
              <FontAwesome name="user" size={18} color="#333" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateToScreen(userType === 'buyer' ? '/(buyerTabs)/settings' : '/(sellerTabs)/settings')}>
              <FontAwesome name="cog" size={18} color="#333" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 35 : 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: Platform.OS === 'android' ? 70 : 90,
  },
  logoButtonContainer: {
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  titleContainer: {
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerMenu: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: 24,
    height: 3,
    backgroundColor: '#333',
    borderRadius: 2,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menuContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 65 : 80,
    right: 10,
    left: undefined,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 200,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIcon: {
    marginRight: 12,
    width: 20,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});
