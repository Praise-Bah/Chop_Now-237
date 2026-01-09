import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function AddItemScreen() {
  const router = useRouter();
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [platesAvailable, setPlatesAvailable] = useState('');
  const [description, setDescription] = useState('');
  const [complimentName, setComplimentName] = useState('');
  const [complimentPrice, setComplimentPrice] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [compliments, setCompliments] = useState<Array<{name: string, price: string, free: boolean}>>([]);

  const handleAddCompliment = () => {
    if (complimentName.trim()) {
      setCompliments([
        ...compliments,
        { name: complimentName, price: complimentPrice, free: isFree }
      ]);
      setComplimentName('');
      setComplimentPrice('');
      setIsFree(false);
    }
  };

  const handleRemoveCompliment = (index: number) => {
    const updatedCompliments = [...compliments];
    updatedCompliments.splice(index, 1);
    setCompliments(updatedCompliments);
  };

  const handleAddFood = () => {
    // Here you would handle the form submission
    console.log({ foodName, price, platesAvailable, description, compliments });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }} 
      />
      
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Add New Food Item</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <FontAwesome name="times" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subtitle}>Add details about the food you're offering today</Text>
      
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formRow}>
          <View style={styles.formColumn}>
            <Text style={styles.label}>Food Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Jollof Rice"
              value={foodName}
              onChangeText={setFoodName}
            />
          </View>
          
          <View style={styles.formColumn}>
            <Text style={styles.label}>Price ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 10.99"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </View>
        
        <Text style={styles.label}>Plates Available</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 20"
          keyboardType="number-pad"
          value={platesAvailable}
          onChangeText={setPlatesAvailable}
        />
        
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe your dish..."
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
        
        <View style={styles.formRow}>
          <View style={styles.formColumn}>
            <Text style={styles.label}>Food Image</Text>
            <TouchableOpacity style={styles.uploadContainer}>
              <FontAwesome name="upload" size={24} color="#888" />
              <Text style={styles.uploadText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.formColumn}>
            <Text style={styles.label}>Food Video</Text>
            <TouchableOpacity style={styles.uploadContainer}>
              <FontAwesome name="video-camera" size={24} color="#888" />
              <Text style={styles.uploadText}>Upload Video</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.label}>Content Duration</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text>24 hours</Text>
          <FontAwesome name="chevron-down" size={16} color="#888" />
        </TouchableOpacity>
        
        <Text style={styles.label}>Compliments (Optional)</Text>
        <View style={styles.formRow}>
          <TextInput
            style={[styles.input, { flex: 2, marginRight: 8 }]}
            placeholder="Compliment name"
            value={complimentName}
            onChangeText={setComplimentName}
          />
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Price"
            keyboardType="decimal-pad"
            value={complimentPrice}
            onChangeText={setComplimentPrice}
          />
          <View style={styles.checkboxContainer}>
            <Pressable 
              style={[styles.checkbox, isFree && styles.checkboxChecked]}
              onPress={() => setIsFree(!isFree)}
            >
              {isFree && <FontAwesome name="check" size={12} color="#fff" />}
            </Pressable>
            <Text style={styles.checkboxLabel}>Free</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.addComplimentButton} onPress={handleAddCompliment}>
          <Text style={styles.addComplimentText}>Add Compliment</Text>
        </TouchableOpacity>
        
        {compliments.map((compliment, index) => (
          <View key={index} style={styles.complimentItem}>
            <Text style={styles.complimentName}>{compliment.name}</Text>
            <Text style={styles.complimentPrice}>
              {compliment.free ? 'Free' : `$${compliment.price}`}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveCompliment(index)}>
              <FontAwesome name="times" size={16} color="#ff0000" />
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
          <Text style={styles.addButtonText}>Add Food</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 8,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formColumn: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  uploadContainer: {
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    color: '#888',
    marginTop: 8,
  },
  dropdown: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#ff8a3a',
    borderColor: '#ff8a3a',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  addComplimentButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  addComplimentText: {
    color: '#333',
    fontWeight: '600',
  },
  complimentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  complimentName: {
    flex: 2,
    fontSize: 14,
    color: '#333',
  },
  complimentPrice: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#ff8a3a',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 40,
  },
});
