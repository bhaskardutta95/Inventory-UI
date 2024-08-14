import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './components/pages/Dashboard';
import TabManager from './components/TabManager';
import BillSummary from './components/pages/BillSummary';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="TabManager" component={TabManager} options={{ title: 'Billing Tabs' }} />
        <Stack.Screen name="BillSummary" component={BillSummary} options={{ title: 'Bill Summary' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
