import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function BillSummary({ route, navigation }) {
  const { products } = route.params;

  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalBill = products.reduce((sum, product) => sum + (product.quantity * product.salePrice), 0);

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Product Name</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Quantity</Text>
        <Text style={styles.headerText}>Total</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cellText}>{item.productName}</Text>
            <Text style={styles.cellText}>Rs.{item.salePrice}</Text>
            <Text style={styles.cellText}>{item.quantity}</Text>
            <Text style={styles.cellText}>Rs.{item.salePrice * item.quantity}</Text>
          </View>
        )}
      />

      {/* Total Quantity and Bill */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Quantity: {totalQuantity}</Text>
        <Text style={styles.totalText}>Total Bill: Rs.{totalBill}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="BACK" onPress={() => navigation.goBack()} />
        <Button title="OK" onPress={() => alert('Transaction Completed')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
