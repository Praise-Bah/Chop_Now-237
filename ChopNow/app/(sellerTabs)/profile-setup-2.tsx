import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Modal, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function BusinessProfileSetup2Screen() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);

  // Time dropdown options
  const timeOptions = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
    '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'
  ];
  
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleUploadLogo = () => {
    // This will be implemented with image picker
    Alert.alert('Upload Logo', 'This would open the image picker to upload a business logo');
    // Simulate successful upload
    setBusinessLogo('uploaded');
  };

  const handleComplete = () => {
    if (!description || !location || !startTime || !endTime) {
      Alert.alert('Required Fields', 'Please fill in all the required fields');
      return;
    }
    
    // Navigate to the verification process
    router.push('/(seller)/verification-id');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Business Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Tell customers about your food specialties"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Business Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your business address"
          value={location}
          onChangeText={setLocation}
        />

        <View style={styles.timeContainer}>
          <View style={styles.timeField}>
            <Text style={styles.label}>Active Hours - Start</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowStartTimePicker(true)}
            >
              <Text style={startTime ? styles.selectedTextStyle : styles.placeholderStyle}>
                {startTime || 'Start Time'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timeField}>
            <Text style={styles.label}>Active Hours - End</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowEndTimePicker(true)}
            >
              <Text style={endTime ? styles.selectedTextStyle : styles.placeholderStyle}>
                {endTime || 'End Time'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Start Time Picker Modal */}
        <Modal
          visible={showStartTimePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowStartTimePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Start Time</Text>
              <FlatList
                data={timeOptions}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                  <TouchableOpacity 
                    style={styles.timeItem}
                    onPress={() => {
                      setStartTime(item);
                      setShowStartTimePicker(false);
                    }}
                  >
                    <Text style={[styles.timeItemText, startTime === item && styles.selectedTimeText]}>{item}</Text>
                  </TouchableOpacity>
                )}
                style={styles.timeList}
              />
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowStartTimePicker(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {/* End Time Picker Modal */}
        <Modal
          visible={showEndTimePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowEndTimePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select End Time</Text>
              <FlatList
                data={timeOptions}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                  <TouchableOpacity 
                    style={styles.timeItem}
                    onPress={() => {
                      setEndTime(item);
                      setShowEndTimePicker(false);
                    }}
                  >
                    <Text style={[styles.timeItemText, endTime === item && styles.selectedTimeText]}>{item}</Text>
                  </TouchableOpacity>
                )}
                style={styles.timeList}
              />
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowEndTimePicker(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Business Flyer or Logo</Text>
        <TouchableOpacity 
          style={styles.uploadContainer} 
          onPress={handleUploadLogo}
        >
          <View style={styles.uploadContent}>
            <FontAwesome name="file-image-o" size={24} color="#aaa" />
            <Text style={styles.uploadText}>Click to upload business flyer or logo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.completeButton} 
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>Complete Profile & Start Selling</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  timeField: {
    width: '48%',
  },
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#aaa',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  timeList: {
    maxHeight: 300,
  },
  timeItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTimeText: {
    color: '#4682B4',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  uploadContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
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
  completeButton: {
    backgroundColor: '#4682B4', // Steel Blue color
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
