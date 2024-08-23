import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SQLiteProvider } from "expo-sqlite/next";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './screens/Dashboard';

const Stack = createNativeStackNavigator();

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
    <View style={{flex: 1}}>
    <ActivityIndicator size="large" />
    <Text>Loading...</Text>
    </View>
  );

  return (
    <NavigationContainer>    
      <React.Suspense
        fallback = {
          <View style={{flex: 1}}>
            <ActivityIndicator size={"large"} />
            <Text>Loading Database...</Text>
          </View>
        }>
        <SQLiteProvider databaseName='storedb.db' useSuspense={true}>
          <Stack.Navigator>
            <Stack.Screen 
              name="Dashboard" 
              component={Dashboard}
              options={{ headerTitle: 'Dashboard', 
                         headerLargeTitle: true, 
                      }} />
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>

  );
}