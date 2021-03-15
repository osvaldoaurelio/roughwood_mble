import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';

export default function () {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
        <StatusBar style="auto" />
      </AuthProvider>
    </NavigationContainer>
  );
}
