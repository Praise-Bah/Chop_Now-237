import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons'; // Added FontAwesome
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function BusinessProfileScreen() {
  const [businessName, setBusinessName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  // Added from business-details.tsx
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const [businessLogo, setBusinessLogo] = useState<string | null>(null);

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleStartTimeConfirm = (date: Date) => {
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setStartTime(formattedTime);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleEndTimeConfirm = (date: Date) => {
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setEndTime(formattedTime);
    hideEndTimePicker();
  };

  // Added from business-details.tsx
  const handleUploadLogo = () => {
    // This will be implemented with image picker
    Alert.alert('Upload Logo', 'This would open the image picker to upload a business logo');
    // Simulate successful upload
    setBusinessLogo('uploaded');
  };

  const handleCompleteProfile = () => { // Renamed and updated logic
    if (!businessName || !phoneNumber || !description || !location || !startTime || !endTime) {
      Alert.alert('Required Fields', 'Please fill in all the required fields');
      return;
    }
    
    // Navigate to the main app (tabs)
    router.push('/(tabs)/' as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.logoText}>CHOP NOW Logo</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Setup Your Business Profile</Text>
          <Text style={styles.subtitle}>Tell customers about your food business</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Chef John's Kitchen"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Tell customers about your food specialties"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your business address"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* --- Fields from business-details.tsx start here --- */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Active Hours</Text>
            <View style={styles.timeContainer}>
              <View style={styles.timeField}>
                <Text style={styles.label}>Start Time</Text>
                <TouchableOpacity onPress={showStartTimePicker} style={styles.timeInputButton}>
                  <Text style={styles.timeInputText}>{startTime || 'Select Start Time'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isStartTimePickerVisible}
                  mode="time"
                  onConfirm={handleStartTimeConfirm}
                  onCancel={hideStartTimePicker}
                  headerTextIOS="Pick a start time"
                />
              </View>
              <View style={styles.timeField}>
                <Text style={styles.label}>End Time</Text>
                <TouchableOpacity onPress={showEndTimePicker} style={styles.timeInputButton}>
                  <Text style={styles.timeInputText}>{endTime || 'Select End Time'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isEndTimePickerVisible}
                  mode="time"
                  onConfirm={handleEndTimeConfirm}
                  onCancel={hideEndTimePicker}
                  headerTextIOS="Pick an end time"
                />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Flyer or Logo</Text>
            <TouchableOpacity 
              style={styles.uploadContainer} 
              onPress={handleUploadLogo}
            >
              <View style={styles.uploadContent}>
                {businessLogo ? (
                  <Text style={styles.uploadText}>Logo Uploaded!</Text>
                ) : (
                  <>
                    <FontAwesome name="file-image-o" size={24} color="#aaa" />
                    <Text style={styles.uploadText}>Click to upload business flyer or logo</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
          {/* --- Fields from business-details.tsx end here --- */}

          <TouchableOpacity 
            style={styles.completeButton} // Changed from continueButton
            onPress={handleCompleteProfile} // Changed handler
          >
            <Text style={styles.completeButtonText}>Complete Profile & Start Selling</Text> {/* Changed text */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContentContainer: { // Renamed from contentContainer for clarity
    padding: 20,
    paddingBottom: 40, // Ensure space for the button
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20, // Adjusted for KeyboardAvoidingView
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    // marginTop: 15, // Removed from here, apply specifically if needed
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  timeInputButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50, // Adjust as needed to match input height
  },
  timeInputText: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top', // Ensure text starts from top in multiline
  },
  // Styles from business-details.tsx
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Added consistent margin
  },
  timeField: {
    width: '48%',
  },
  uploadContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 30, // Adjusted padding
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5, // Reduced top margin
    // marginBottom: 20, // Handled by formGroup
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fafbfc',
    marginBottom: 0,
  },
  picker: {
    height: 48,
    width: '100%',
    color: '#222',
    backgroundColor: 'transparent',
  },
  uploadContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  completeButton: { // Renamed from continueButton for clarity
    backgroundColor: '#4682B4', // Steel Blue color
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10, // Added margin top
  },
  completeButtonText: { // Renamed from continueButtonText
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
