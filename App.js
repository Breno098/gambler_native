import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import AppProvider from './src/providers/app';

export default function App() {
  return (
      <NavigationContainer>
        <AppProvider>
            <StatusBar backgroundColor="#ff636b" barStyle="light-content"/>
            <Routes/>
        </AppProvider>
      </NavigationContainer>
  );
}
