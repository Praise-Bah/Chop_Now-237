import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { Text } from '@/components/Themed'; 
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

interface SettingsItemProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  description?: string;
  onPress?: () => void;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, description, onPress, isSwitch, switchValue, onSwitchChange }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer} disabled={isSwitch}>
      <FontAwesome name={icon} size={22} color="#555" style={styles.itemIcon} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemLabel}>{label}</Text>
        {description && <Text style={styles.itemDescription}>{description}</Text>}
      </View>
      {isSwitch ? (
        <Switch
          trackColor={{ false: '#767577', true: '#FF6347' }} 
          thumbColor={switchValue ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onSwitchChange}
          value={switchValue}
        />
      ) : (
        <FontAwesome name="chevron-right" size={16} color="#ccc" />
      )}
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

  const handleLogout = () => {
    router.replace('/login'); 
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.headerTitle}>Settings</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <SettingsItem icon="user-o" label="Personal Information" description="Update your personal details" onPress={() => console.log('Navigate to personal info')} />
        <SettingsItem icon="bell-o" label="Notifications" description="Manage your notification preferences" onPress={() => console.log('Navigate to notifications')} />
        <SettingsItem icon="shield" label="Privacy & Security" description="Manage your security settings" onPress={() => console.log('Navigate to privacy')} />
        <SettingsItem icon="credit-card" label="Payment Methods" description="Manage payment options" onPress={() => console.log('Navigate to payment')} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <SettingsItem 
          icon="moon-o" 
          label="Dark Mode" 
          description="Switch between light and dark theme" 
          isSwitch 
          switchValue={isDarkMode} 
          onSwitchChange={toggleTheme} 
        />
        <SettingsItem 
          icon="map-marker" 
          label="Location Services" 
          description="Allow app to access your location" 
          isSwitch 
          switchValue={isLocationEnabled} 
          onSwitchChange={setIsLocationEnabled} 
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingsItem icon="question-circle-o" label="Help Center" description="Get help with using the app" onPress={() => console.log('Navigate to help center')} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={20} color="#FF6347" style={styles.logoutIcon} />
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30, 
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 30, 
    paddingBottom: 20,
    color: '#111',
    backgroundColor: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemIcon: {
    marginRight: 18,
    width: 24, 
    textAlign: 'center',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#FFD2D2', 
    shadowColor: "#FF6347",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    fontSize: 17,
    color: '#FF6347', 
    fontWeight: '600',
  },
});
