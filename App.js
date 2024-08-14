import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './components/pages/Dashboard';
import Billing from './components/pages/Billing';
import Stock from './components/pages/Stock';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Billing" component={Billing} />
        <Stack.Screen name="Stock" component={Stock} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
