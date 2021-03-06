import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import AppProvider from './src/providers/app';

LogBox.ignoreAllLogs();

export default function App() {
  return (
      <NavigationContainer>
        <AppProvider>
            <StatusBar backgroundColor="#f76a05" barStyle="light-content"/>
            <Routes/>
        </AppProvider>
      </NavigationContainer>
  );
}
