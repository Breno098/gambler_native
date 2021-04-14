import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import App from '../../../components/App';
import Button from '../../../components/Button';

export default function Home() {
  const navigation = useNavigation();

  return (
        <App style={{ alignItems: 'center', justifyContent: 'center' }}>

        <Image 
          style={{
            height: 100,
            width: 100
          }} 
          source={require('../../../images/Logo.png')}
        />

        <Text 
          style={{
            fontSize: 35,
            color: 'rgba(0, 0, 0, 1)',
            textAlign: 'center',
            marginBottom: 200
          }}
        >
           Fut Gamblers
        </Text>
   
        <Button
          style={{ marginBottom: 23, width: '95%' }}
          label="Registrar"
          mode={"text"}
          onPress={() => navigation.navigate('SignUp')}
        />

        <Button
          label="Login"
          color="rgba(0, 255, 0, 0.5)"
          style={{ width: '95%' }}
          onPress={() => navigation.navigate('Login')}
        />
      </App>
  );
}