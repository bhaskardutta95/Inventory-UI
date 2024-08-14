import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Billing() {
  const [products, setProducts] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [productName, setProductName] = useState('');
  const [mrp, setMrp] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const handleAddProduct = () => {
    if (!barcode || !productName || !mrp || !salePrice || !quantity) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const newProduct = {
      id: Math.random().toString(), // Unique id
      barcode,
      productName,
      mrp,
      salePrice,
      quantity: parseInt(quantity),
    };

    setProducts([...products, newProduct]);

    // Clear input fields
    setBarcode('');
    setProductName('');
    setMrp('');
    setSalePrice('');
    setQuantity('');
  };

  const handleDone = () => {
    navigation.navigate('BillSummary', { products });
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleCloseTab = () => {
    navigation.goBack(); // Navigates back to the previous screen
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.barcode}</Text>
      <Text style={styles.cell}>{item.productName}</Text>
      <Text style={styles.cell}>{item.mrp}</Text>
      <Text style={styles.cell}>{item.salePrice}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Button title="Close Tab" onPress={handleCloseTab} color="red" /> */}
      <Text style={styles.title}>Billing Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Barcode"
        value={barcode}
        onChangeText={setBarcode}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="MRP"
        keyboardType="numeric"
        value={mrp}
        onChangeText={setMrp}
      />
      <TextInput
        style={styles.input}
        placeholder="Sale Price"
        keyboardType="numeric"
        value={salePrice}
        onChangeText={setSalePrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Button title="Add Product" onPress={handleAddProduct} />
      <Button title="DONE" onPress={handleDone} />
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Barcode</Text>
          <Text style={styles.headerCell}>Product Name</Text>
          <Text style={styles.headerCell}>MRP</Text>
          <Text style={styles.headerCell}>Sale Price</Text>
          <Text style={styles.headerCell}>Quantity</Text>
          <Text style={styles.headerCell}>Action</Text>
        </View>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  table: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    color: 'red',
    textAlign: 'center',
  },
});
