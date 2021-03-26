import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Container, Image, TouchableOpacity } from 'react-native';
import App from '../../../components/App';


export default function Registrations() {
  const navigation = useNavigation();

  return (
      <App style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.logo}>
          <Image style={{ height: 100, width: 100 }} source={require('../../../images/Logo-orange.png')}/>
        </View>

        <View style={styles.cardGroup}>
            <View style={styles.cardRow}>
                <TouchableOpacity style={styles.card} on>
                    <Image 
                        style={styles.cardImage} 
                        source={require('../../../images/cards-register/player.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{...styles.card}}
                    onPress={() => navigation.navigate('Country')}
                >
                    <Image 
                        style={styles.cardImage} 
                        source={require('../../../images/cards-register/country.jpg')}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.cardRow}>
                <TouchableOpacity style={styles.card}>
                    <Image 
                        style={styles.cardImage} 
                        source={require('../../../images/cards-register/stadium.jpg')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.card}}>
                    <Image 
                        style={styles.cardImage} 
                        source={require('../../../images/cards-register/team.jpg')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.cardRow}>
                <TouchableOpacity style={styles.card}>
                    <Image 
                        style={styles.cardImage} 
                        source={require('../../../images/cards-register/game.jpg')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.card}}>
                    <Image 
                    style={styles.cardImage} 
                    source={require('../../../images/cards-register/competition.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
        
      </App>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '100%',
    paddingTop: 50,
  },

  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%', 
  },

  cardGroup: {
    height: '90%', 
    width: '90%',
    marginTop: 20
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '20%', 
    marginBottom: 5
  },

  cardImage: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 5,
  },

  card: {
    width: '49.5%',
    height: '100%',
    borderRadius: 2,
  },
});
