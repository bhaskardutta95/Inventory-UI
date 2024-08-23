import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const loadDatabase = async () => {
  const dbName = 'storedb.db';
  const dbAsset = require('./assets/storedb.db');
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbPath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbPath);
  }
};


export default function App() {
  const [dbLoaded, setDbLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((err) => console.log(err));
  },[]);

  if (!dbLoaded) return (
    <View style={styles.container}>
    <ActivityIndicator size="large" />
    <Text>Loading...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
