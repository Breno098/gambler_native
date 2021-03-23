import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


export default function Home() {
  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../../images/Logo.png')}/>

        <Text style={styles.logoText}>
           Fut Gamblers
        </Text>
   
        <TouchableOpacity
          style={styles.goSingUp}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.goSingUpText}>
            Registrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.goLogin}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.goLoginText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff636b',
    width: '100%'

    // rgba(0, 0, 0, 1,)
  },

  logo: {
    height: 100,
    width: 100
  },

  logoText: {
    fontSize: 35,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    marginBottom: 200
  },

  goSingUp: {
    borderColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 1,
    height: 60,
    width: '85%',
    borderRadius: 25,
    justifyContent: 'center',
  },

  goSingUpText: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
  }, 

  goLogin: {
    height: 60,
    width: '85%',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    marginTop: 35
  },

  goLoginText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#ff636b'
  }
});
