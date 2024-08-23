import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import BarcodeScanner from '../libs/BarcodeScanner';
import { Ionicons } from '@expo/vector-icons';
import ExpoCamera from '../libs/ExpoCamera';

export default function Inventory() {
  const [barcode, setBarcode] = useState('');
  const [variantName, setVariantName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [mrp, setMrp] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [batch, setBatch] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleBarcodeScan = (data) => {
    setBarcode(data);
    setShowScanner(false);
    // Optionally, fetch data based on the scanned barcode and fill other fields
  };

  const handleQuantityIncrease = () => setQuantity(quantity + 1);
  const handleQuantityDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const handleSubmit = () => {
    if (!productName) {
      Alert.alert('Error', 'Product Name is required');
      return;
    }
    if (quantity <= 0) {
      Alert.alert('Error', 'Quantity must be greater than 0');
      return;
    }
    Alert.alert('Success', 'Inventory data submitted successfully!');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Add Inventory</Text>

      <View style={styles.barcodeContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Bar Code"
          value={barcode}
          onChangeText={setBarcode}
        />
        <TouchableOpacity onPress={() => setShowScanner(true)} style={styles.barcodeButton}>
          <Ionicons name="barcode-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

       {showScanner && <BarcodeScanner onScan={handleBarcodeScan} onClose={() => setShowScanner(false)} />} 

       
      <TextInput
        style={styles.input}
        placeholder="Product Name (required)"
        value={productName}
        onChangeText={setProductName}
      />

      <TextInput
        style={styles.input}
        placeholder="Variant Name"
        value={variantName}
        onChangeText={setVariantName}
      />


      <View style={styles.quantityContainer}>
        <Text>Quantity (required): </Text>
        <TouchableOpacity onPress={handleQuantityDecrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <TouchableOpacity onPress={handleQuantityIncrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="MRP"
        keyboardType="numeric"
        value={mrp}
        onChangeText={setMrp}
      />

      <TextInput
        style={styles.input}
        placeholder="Retail Price"
        keyboardType="numeric"
        value={retailPrice}
        onChangeText={setRetailPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Batch"
        value={batch}
        onChangeText={setBatch}
      />

      <TextInput
        style={styles.input}
        placeholder="Expiry Date"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  barcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  barcodeButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginLeft: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#000',
  },
  quantityValue: {
    fontSize: 18,
  },
});
