import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Text } from '@/components/Themed';
import AppHeader from '@/components/AppHeader';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const screenOptions = {};

export default function SellerSettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = React.useState(false);
  const [locationServices, setLocationServices] = React.useState(true);

  const toggleDarkMode = () => setDarkMode(previousState => !previousState);
  const toggleLocationServices = () => setLocationServices(previousState => !previousState);

  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/personal-information')}>
            <View style={styles.settingIconContainer}>
              <FontAwesome name="user" size={22} color="#555" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Personal Information</Text>
              <Text style={styles.settingDescription}>Update your personal details</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#aaa" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/notifications-settings')}>
            <View style={styles.settingIconContainer}>
              <FontAwesome name="bell" size={22} color="#555" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Manage your notification preferences</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#aaa" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/privacy-security')}>
            <View style={styles.settingIconContainer}>
              <FontAwesome name="lock" size={22} color="#555" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Privacy & Security</Text>
              <Text style={styles.settingDescription}>Manage your security settings</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#aaa" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/payment-methods')}>
            <View style={styles.settingIconContainer}>
              <FontAwesome name="credit-card" size={22} color="#555" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Payment Methods</Text>
              <Text style={styles.settingDescription}>Manage payment options</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#aaa" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <FontAwesome name="moon-o" size={22} color="#555" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Switch between light and dark theme</Text>
            </View>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#ff8a3a50" }}
              thumbColor={darkMode ? "#ff8a3a" : "#f4f3f4"}
              ios_backgroundColor="#e0e0e0"
              onValueChange={toggleDarkMode}
              value={darkMode}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <FontAwesome name="map-marker" size={22} color="#555" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Location Services</Text>
              <Text style={styles.settingDescription}>Allow app to access your location</Text>
            </View>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#ff8a3a50" }}
              thumbColor={locationServices ? "#ff8a3a" : "#f4f3f4"}
              ios_backgroundColor="#e0e0e0"
              onValueChange={toggleLocationServices}
              value={locationServices}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/help-center')}>
            <View style={styles.settingIconContainer}>
              <FontAwesome name="question-circle" size={22} color="#555" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Help Center</Text>
              <Text style={styles.settingDescription}>Get help with using the app</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#aaa" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/login')}>
          <FontAwesome name="sign-out" size={18} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
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
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    borderRadius: 8,
    paddingVertical: 14,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 20,
  },
});
