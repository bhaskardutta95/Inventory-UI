import React from 'react';
import { View, Text, StyleSheet, Dimensions,Pressable } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';



const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = Math.min(width, height) / 3; // Ensures buttons fit well in the screen

export default function Dashboard({ navigation }) {


  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('TabManager', { screen: 'Billing' })}
      >
        <Ionicons name="card" size={50} color="white" />
        <Text style={styles.buttonText}>BILLING</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Inventory')}
      >
        <FontAwesome5 name="plus-square" size={50} color="white" />
        <Text style={styles.buttonText}>ADD INVENTORY</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Inventory')}
      >
        <FontAwesome5 name="box" size={50} color="white" />
        <Text style={styles.buttonText}>VIEW INVENTORY</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('CreateTable')}
      >
        <Ionicons name="lock-closed-outline" size={50} color="white" />
        <Text style={styles.buttonText}>CREATE TABLES</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: '#007bff', 
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    elevation: 5, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
