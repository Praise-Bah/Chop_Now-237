import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function BuyerSignupScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idFrontImage, setIdFrontImage] = useState<string | null>(null);
  const [idBackImage, setIdBackImage] = useState<string | null>(null);

  const handleUploadIdFront = () => {
    Alert.alert('Upload ID Front', 'This would open the image picker to upload the front of your ID.');
    setIdFrontImage('uploaded'); // Simulate successful upload
  };

  const handleUploadIdBack = () => {
    Alert.alert('Upload ID Back', 'This would open the image picker to upload the back of your ID.');
    setIdBackImage('uploaded'); // Simulate successful upload
  };

  const handleCreateAccount = () => {
    if (!firstName || !lastName || !phoneNumber || !location || !password || !confirmPassword || !idFrontImage || !idBackImage) {
      Alert.alert('Required Fields', 'Please fill in all required fields, including password and ID images.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'The passwords do not match. Please try again.');
      return;
    }
    
    // This will be connected to backend later
    console.log('Buyer signup with:', { firstName, lastName, phoneNumber, location, password /* Store securely! */ });
    // Navigate to buyer's main tab interface
    router.replace('/(buyerTabs)');
  };



  const handleSignIn = () => {
    router.push('/login' as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.logoText}>CHOP NOW Logo</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.titleText}>Create a Buyer Account</Text>
          <Text style={styles.subtitleText}>Fill in your details to get started</Text>

          <View style={styles.nameContainer}>
            <View style={[styles.inputGroup, styles.nameInput]}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={[styles.inputGroup, styles.nameInput]}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Doe"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Create Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ID Front Picture</Text>
            <TouchableOpacity style={styles.uploadContainer} onPress={handleUploadIdFront}>
              <View style={styles.uploadContent}>
                {idFrontImage ? (
                  <Text style={styles.uploadText}>ID Front Uploaded!</Text>
                ) : (
                  <>
                    <FontAwesome name="id-card-o" size={24} color="#aaa" />
                    <Text style={styles.uploadText}>Click to upload ID front</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ID Back Picture</Text>
            <TouchableOpacity style={styles.uploadContainer} onPress={handleUploadIdBack}>
              <View style={styles.uploadContent}>
                {idBackImage ? (
                  <Text style={styles.uploadText}>ID Back Uploaded!</Text>
                ) : (
                  <>
                    <FontAwesome name="id-card-o" size={24} color="#aaa" />
                    <Text style={styles.uploadText}>Click to upload ID back</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
            <Text style={styles.createButtonText}>Create Account & Start Ordering</Text>
          </TouchableOpacity>

          <View style={styles.signInContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
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
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameInput: {
    width: '48%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  uploadContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
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

  createButton: {
    backgroundColor: '#FF6347', // Coral color
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  accountText: {
    fontSize: 14,
    color: '#666',
  },
  signInText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6347', // Coral color
  },
});
