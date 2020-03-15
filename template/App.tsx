import React from 'react';
import { ReactNode } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import UsersPage from './components/UsersPage';
import { createStackNavigator } from '@react-navigation/stack';
import UserDialog from './components/UserDialog';

/**
 * @description holds app component, identifies the navigation stack
 */

const Stack = createStackNavigator();

const App: () => ReactNode = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UsersPage" component={UsersPage} options={{
          title: 'GraphQL App',
          headerStyle: styles.headerStyle,
          headerTintColor: styles.headerTintColor,
        }} />
        <Stack.Screen name="UserDialog" component={UserDialog} options={{
          title: 'User',
          headerStyle: styles.headerStyle,
          headerTintColor: styles.headerTintColor
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = {
  headerStyle: {
    backgroundColor: '#e535ab',
    height: 40
  },
  headerTintColor: '#fff',
}

export default App;
