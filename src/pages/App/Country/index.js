import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../services/api';

import App from '../../../components/App';

export default function Country() {
    const navigation = useNavigation();

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        setLoading(true);
        console.log('loadlist');
        await api.get('country').then(response => {
            setCountries(response.data.countries);
            setLoading(false);
        })
    }

    return (
        <App style={{ justifyContent: 'space-between' }}>
            <Image 
                style={styles.image} 
                source={require('../../../images/forms-register/country.jpg')}
            />
            <View style={ styles.list }>
                {   
                    loading 
                    ? 
                    <View>
                        <ActivityIndicator size="large" color="#00f018"/>
                        <Text style={{ color: '#00f018', marginTop: 15 }}> Carregando... </Text>
                    </View>
                    :
                    <ScrollView>
                        { countries.map(country => (
                            <View key={country.id} style={styles.card}> 
                                <View style={styles.cardBody}>
                                    <Text style={styles.itemListText}>
                                        ID: {country.id} 
                                    </Text>
                                    <Text style={styles.itemListText}>
                                        Nome: {country.name} 
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.buttonCard}
                                    onPress={() => navigation.navigate('FormCountry', { country }) }
                                >
                                    <Text style={styles.buttonText}>
                                        EDITAR
                                    </Text>
                                    <Icon name="pencil" size={15} color="#00f018" style={{ marginLeft: 5 }}/>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                }

            </View>

            <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('FormCountry') }>
                <Text style={styles.buttonText}>
                    ADICIONAR REGISTRO
                </Text>
                <Icon name="plus" size={15} color="#00f018" style={{ marginLeft: 5 }}/>
            </TouchableOpacity>
        
        </App>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        width: '100%',
        paddingTop: 50,
        paddingBottom: 20,
    },

    image: { 
        width: '90%', 
        height: '10%', 
        borderRadius: 5,
        opacity: 0.8
    },

    list: {
        height: '75%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }, 

    card: {
        width: '100%',
        height: 60,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        marginBottom: 7,
        flexDirection: 'row',
    },

    cardBody: {
        width: '75%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },

    buttonCard: {
        flexDirection: 'row',
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: '#00f018',
        borderWidth: 1
    },

    itemListText: {
        fontSize: 15,
        color: '#000'
    },

    buttonText: {
        fontSize: 15,
        color: '#00f018'
    },

    buttonAdd: {
        flexDirection: 'row',
        width: '90%',
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#00f018',
        borderWidth: 1,
    }
});
