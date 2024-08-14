import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function Billing({ navigation }) {
  const [barcode, setBarcode] = useState('');
  const [productName, setProductName] = useState('');
  const [mrp, setMrp] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    const newProduct = {
      barcode,
      productName,
      mrp: parseFloat(mrp),
      salePrice: parseFloat(salePrice),
      quantity: parseInt(quantity),
      total: parseFloat(salePrice) * parseInt(quantity),
    };

    setProducts([...products, newProduct]);
    setBarcode('');
    setProductName('');
    setMrp('');
    setSalePrice('');
    setQuantity('');
  };

  const handleDone = () => {
    navigation.navigate('BillSummary', { products });
  };

  return (
    <View style={styles.container}>
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
        value={mrp}
        onChangeText={setMrp}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Sale Price"
        value={salePrice}
        onChangeText={setSalePrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Button title="Add Product" onPress={handleAddProduct} />
      <Button title="DONE" onPress={handleDone} />

      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.productName} - {item.quantity} x ${item.salePrice} = ${item.total}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  productItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
