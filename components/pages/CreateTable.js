import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('myDatabase.db');

const CreateTable = ({ navigation }) => {
  useEffect(() => {
    createTable();
  }, []);

  const createTable = async () => {
    try {
      await db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Customers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)'
        );
      });
      console.log('Table created successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  return (
    <View>
      <Text>Creating Table...</Text>
    </View>
  );
};

export default CreateTable;