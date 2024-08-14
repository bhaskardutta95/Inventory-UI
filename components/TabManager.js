// TabManager.js

import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Billing from './pages/Billing';
import { MAX_TABS } from '../config';

const Tab = createBottomTabNavigator();

export default function TabManager() {
  const [tabs, setTabs] = useState([0]); // Start with one tab
  const [tabSwitchButtons, setTabSwitchButtons] = useState([0]);
  const navigation = useNavigation();

  const addTab = () => {
    if (tabs.length >= MAX_TABS) {
      Alert.alert(`Cannot add more than ${MAX_TABS} tabs.`);
      return;
    }
    const newTabId = tabs.length;
    setTabs([...tabs, newTabId]);
    setTabSwitchButtons([...tabSwitchButtons, newTabId]);
  };

  const removeTab = (tabId) => {
    const updatedTabs = tabs.filter(id => id !== tabId);
    const updatedTabSwitchButtons = tabSwitchButtons.filter(id => id !== tabId);

    setTabs(updatedTabs);
    setTabSwitchButtons(updatedTabSwitchButtons);

    // Navigate back to Dashboard if no tabs are left
    if (updatedTabs.length === 0) {
      navigation.navigate('Dashboard');
    } else if (updatedTabs.length > 0) {
      // Select a valid tab to navigate to
      const firstTabId = updatedTabs[0];
      navigation.navigate(`Billing ${firstTabId + 1}`);
    }
  };

  const switchToTab = (tabId) => {
    navigation.navigate(`Billing ${tabId + 1}`);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Billing Tab" onPress={addTab} />
      <View style={styles.switchButtonContainer}>
        {tabSwitchButtons.map(tabId => (
          <View key={tabId} style={styles.tabSwitchButtonContainer}>
            <Button
              title={`Go to Billing ${tabId + 1}`}
              onPress={() => switchToTab(tabId)}
            />
            <Button
              title="X"
              onPress={() => removeTab(tabId)}
              color="red"
            />
          </View>
        ))}
      </View>
      <Tab.Navigator>
        {tabs.map(tabId => (
          <Tab.Screen
            key={tabId}
            name={`Billing ${tabId + 1}`}
            component={Billing}
            options={{
              tabBarLabel: `Billing ${tabId + 1}`,
              tabBarButton: (props) => (
                <View style={styles.tabButtonContainer}>
                  <View {...props} />
                </View>
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tabSwitchButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  tabButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
