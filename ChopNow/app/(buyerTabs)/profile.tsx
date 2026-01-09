import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import { Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';

interface UserProfile {
  fullName: string;
  accountType: string;
  phoneNumber: string;
  email: string;
  address: string;
  profileImage: string | null;
  stats: {
    ordersPlaced: number;
    favoriteSellers: number;
  };
}

export default function ProfileScreen() {
  // Sample user data
  const [profile, setProfile] = useState<UserProfile>({
    fullName: 'John Doe',
    accountType: 'Buyer Account',
    phoneNumber: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    profileImage: null,
    stats: {
      ordersPlaced: 12,
      favoriteSellers: 5
    }
  });

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({...profile});

  const handleEditProfile = () => {
    setEditedProfile({...profile});
    setIsEditModalVisible(true);
  };

  const handleSaveChanges = () => {
    setProfile({...editedProfile});
    setIsEditModalVisible(false);
  };

  const handleUploadPhoto = () => {
    // This would be implemented with image picker
    alert('This would open the image picker');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <FontAwesome name="pencil" size={16} color="#000" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            {profile.profileImage ? (
              <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImageInitials}>
                  {profile.fullName.split(' ').map(name => name[0]).join('')}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{profile.fullName}</Text>
            <Text style={styles.accountType}>{profile.accountType}</Text>
          </View>
        </View>

        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <FontAwesome name="phone" size={16} color="#666" style={styles.contactIcon} />
            <Text style={styles.contactText}>{profile.phoneNumber}</Text>
          </View>
          
          <View style={styles.contactItem}>
            <FontAwesome name="envelope" size={16} color="#666" style={styles.contactIcon} />
            <Text style={styles.contactText}>{profile.email}</Text>
          </View>
          
          <View style={styles.contactItem}>
            <FontAwesome name="map-marker" size={16} color="#666" style={styles.contactIcon} />
            <Text style={styles.contactText}>{profile.address}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Account Statistics</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.ordersPlaced}</Text>
            <Text style={styles.statLabel}>Orders Placed</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.stats.favoriteSellers}</Text>
            <Text style={styles.statLabel}>Favorite Sellers</Text>
          </View>
        </View>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setIsEditModalVisible(false)}
              >
                <FontAwesome name="times" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.profileImageEditContainer}>
                {editedProfile.profileImage ? (
                  <Image 
                    source={{ uri: editedProfile.profileImage }} 
                    style={styles.profileImageEdit} 
                  />
                ) : (
                  <View style={styles.profileImageEdit}>
                    <Text style={styles.profileImageInitials}>
                      {editedProfile.fullName.split(' ').map(name => name[0]).join('')}
                    </Text>
                  </View>
                )}
                <TouchableOpacity 
                  style={styles.cameraButton} 
                  onPress={handleUploadPhoto}
                >
                  <FontAwesome name="camera" size={16} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={editedProfile.fullName}
                  onChangeText={(text) => setEditedProfile({...editedProfile, fullName: text})}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={editedProfile.email}
                  onChangeText={(text) => setEditedProfile({...editedProfile, email: text})}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={editedProfile.phoneNumber}
                  onChangeText={(text) => setEditedProfile({...editedProfile, phoneNumber: text})}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={styles.input}
                  value={editedProfile.address}
                  onChangeText={(text) => setEditedProfile({...editedProfile, address: text})}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setIsEditModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={handleSaveChanges}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  accountType: {
    fontSize: 14,
    color: '#666',
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactIcon: {
    width: 25,
    textAlign: 'center',
    marginRight: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
    marginTop: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    padding: 20,
  },
  profileImageEditContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImageEdit: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
