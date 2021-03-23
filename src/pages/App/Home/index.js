import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Container, Image } from 'react-native';


export default function Home() {
  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={{ height: 100, width: 100 }} source={require('../../../images/Logo.png')}/>
        </View>

        <View style={styles.cardGroup}>
          <View style={styles.card}>
            <Image 
              style={styles.cardImage} 
              source={require('../../../images/cadastros.jpg')}
              resizeMode = 'stretch'
            />

            <View style={styles.transparentView}>
                <View style={styles.logoViewStyle}>
                  <Text style={styles.cardImageText}> Cadastros </Text>
                </View>
            </View>
          </View>

          <View style={styles.card}>
            <Image 
              style={styles.cardImage} 
              source={require('../../../images/cadastros.jpg')}
              resizeMode = 'stretch'
            />

            <View style={styles.transparentView}>
                <View style={styles.logoViewStyle}>
                  <Text style={styles.cardImageText}> Cadastros </Text>
                </View>
            </View>
          </View>

          <View style={styles.card}>
            <Image 
              style={styles.cardImage} 
              source={require('../../../images/cadastros.jpg')}
              resizeMode = 'stretch'
            />

            <View style={styles.transparentView}>
                <View style={styles.logoViewStyle}>
                  <Text style={styles.cardImageText}> Cadastros </Text>
                </View>
            </View>
          </View>

        </View>
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '100%'
  },

  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%'
  },

  cardGroup: {
    height: '80%',
    width: '90%',
  },

  cardImage: { 
    width: '100%', 
    height: '100%', 
    position: 'relative',
    borderRadius: 15,
    flex: 1,
    opacity: 0.9,
    marginTop: 15
  },

  cardImageText: {
    fontSize: 35,
    color: '#fff',
    marginTop: 15,
    marginLeft: 15
  },

  card: {
    width: '100%',
    flex: 1,
    borderRadius: 15
  },

  transparentView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    position: 'absolute'
  },

  logoViewStyle: {
      justifyContent: 'center',
      alignItems: 'center',
  },
});
