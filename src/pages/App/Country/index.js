import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, Animated, ScrollView, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../services/api';

import App from '../../../components/App';
import SlideButtonRoute from '../../../components/SlideButtonRoute';
import SlideListEdit from '../../../components/SlideListEdit';

export default function Country() {
    const navigation = useNavigation();

    const [country] = useState(new Animated.Value(0))
    const [add] = useState(new Animated.Value(0))
    const [edit, setEdit] = useState([])

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        setLoading(true);
        await api.get('country').then(response => {
            let animateds = [];
            for (let index = 0; index < response.data.countries.length; index++) {
                animateds.push(new Animated.Value(0))
            }
            setEdit(animateds)
            setCountries(response.data.countries);
            setLoading(false);
        })
    }

    return (
        <App style={{ justifyContent: 'space-between', alignItems: 'center' }}>

            <View style={{ width: '100%', height: '10%', justifyContent: 'space-between', alignItems: 'center' }}>
                <SlideButtonRoute
                    animated={country}
                    direction="left"
                    routeName="Registrations"
                    icon="arrow-left"
                    title="Voltar"
                    height={50}
                />
            </View>
            
            {
                loading 
                ?
                <View>
                    <ActivityIndicator size="large" color="#00fff7"/>
                    <Text style={{ color: '#00fff7', marginTop: 15 }}> Carregando... </Text>
                </View>
                :
                <View style={{ width: '100%', height: '70%' }}>
                    <FlatList
                        data={countries}    
                        renderItem={({item, index}) => (
                            <SlideListEdit
                                animated={edit[index]}
                                direction="right"
                                routeName="FormCountry"
                                routeParams={{ country: item }}
                                body={{
                                    id: item.id,
                                    title:item.name,
                                    itens: [], 
                                }}
                            />
                        )}
                    />
                </View>
            }

            <View style={{ width: '100%', height: '10%', justifyContent: 'space-between', alignItems: 'center' }}>
                <SlideButtonRoute
                    animated={add}
                    direction="right"
                    routeName="FormCountry"
                    icon="plus"
                    title="Add"
                    height={50}
                />
            </View>
        </App>
  );
}

const styles = StyleSheet.create({
    image: { 
        width: '90%', 
        height: 90, 
        borderRadius: 30,
        opacity: 0.4,
        marginBottom: 30
    },

    list: {
        height: '75%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }, 

    card: {
        width: '100%',
        height: 80,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        // borderTopLeftRadius: 100,
        // borderBottomLeftRadius: 100,
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
});
