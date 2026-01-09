import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function SellerVerification() {
  const [step, setStep] = useState(1);
  const [idImage, setIdImage] = useState<{ uri: string; type: string } | null>(null);
  const [permitImage, setPermitImage] = useState<{ uri: string; type: string } | null>(null);
  const [verificationVideo, setVerificationVideo] = useState<{ uri: string; type: string } | null>(null);
  const router = useRouter();

  // Upload handlers using expo-image-picker
  const handleUploadId = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setIdImage({ uri: result.assets[0].uri, type: result.assets[0].type || 'image' });
    }
  };

  const handleUploadPermit = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPermitImage({ uri: result.assets[0].uri, type: result.assets[0].type || 'image' });
    }
  };

  const handleUploadVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setVerificationVideo({ uri: result.assets[0].uri, type: result.assets[0].type || 'video' });
    }
  };

  const canProceedStep1 = !!idImage;
  const canProceedStep2 = !!permitImage;
  const canSubmit = !!verificationVideo;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>CHOP NOW Logo</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Seller Verification</Text>
        <Text style={styles.stepText}>
          Step {step} of 3: {step === 1 ? 'ID Verification' : step === 2 ? 'Food Permit License' : 'Verification Video'}
        </Text>
        {/* Step 1: ID Verification */}
        {step === 1 && (
          <>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>ID Verification Required</Text>
              <Text style={styles.alertDesc}>Please upload a clear photo of your government-issued ID for verification.</Text>
            </View>
            <Text style={styles.label}>ID Picture</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={handleUploadId}>
              {idImage ? (
                <Image source={{ uri: idImage.uri }} style={styles.thumbnail} />
              ) : (
                <FontAwesome name="camera" size={28} color="#bbb" />
              )}
              <Text style={styles.uploadText}>{idImage ? 'ID picture uploaded' : 'Click to upload ID picture'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.nextButton, !canProceedStep1 && styles.disabledButton]}
              disabled={!canProceedStep1}
              onPress={() => setStep(2)}
            >
              <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>
          </>
        )}
        {/* Step 2: Food Permit License */}
        {step === 2 && (
          <>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>Food Permit License Required</Text>
              <Text style={styles.alertDesc}>Please upload your food permit license or certification to verify your business.</Text>
            </View>
            <Text style={styles.label}>Food Permit License</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={handleUploadPermit}>
              {permitImage ? (
                <Image source={{ uri: permitImage.uri }} style={styles.thumbnail} />
              ) : (
                <FontAwesome name="upload" size={28} color="#bbb" />
              )}
              <Text style={styles.uploadText}>{permitImage ? 'License uploaded' : 'Click to upload Food Permit License'}</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nextButton, !canProceedStep2 && styles.disabledButton]}
                disabled={!canProceedStep2}
                onPress={() => setStep(3)}
              >
                <Text style={styles.nextButtonText}>Next Step</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {/* Step 3: Verification Video */}
        {step === 3 && (
          <>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>Verification Video Required</Text>
              <Text style={styles.alertDesc}>
                Please record a short 20-second video following the instructions below:{"\n"}
                {"\u2022"} Hold your ID next to your face{"\n"}
                {"\u2022"} Say your full name clearly{"\n"}
                {"\u2022"} Say "I am registering for CHOP NOW as a food seller"
              </Text>
            </View>
            <Text style={styles.label}>Verification Video</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={handleUploadVideo}>
              {verificationVideo ? (
                <FontAwesome name="file-video-o" size={28} color="#7da4ff" />
              ) : (
                <FontAwesome name="video-camera" size={28} color="#bbb" />
              )}
              <Text style={styles.uploadText}>{verificationVideo ? 'Video uploaded' : 'Click to upload Verification Video'}</Text>
              {verificationVideo && (
                <Text style={styles.uploadTextSmall}>{verificationVideo.uri.split('/').pop()}</Text>
              )}
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.backButton} onPress={() => setStep(2)}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nextButton, !canSubmit && styles.disabledButton]}
                disabled={!canSubmit}
                onPress={() => router.replace('/(sellerTabs)')}
              >
                <Text style={styles.nextButtonText}>Submit for Verification</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 4,
    marginBottom: 16,
    color: '#222',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: 340,
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 18,
  },
  alertBox: {
    backgroundColor: '#fff4ee',
    borderColor: '#ffbfa3',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
  },
  alertTitle: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  alertDesc: {
    color: '#444',
    fontSize: 14,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
    color: '#222',
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#dadada',
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    marginBottom: 18,
    backgroundColor: '#f9f9f9',
  },
  uploadText: {
    color: '#bbb',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginBottom: 8,
  },
  nextButton: {
    backgroundColor: '#7da4ff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2,
  },
  uploadTextSmall: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#b3c8e6',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  backButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2,
  },
  backButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
