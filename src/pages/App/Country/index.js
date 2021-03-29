import React, { useState, useEffect } from 'react';
import { View, FlatList, Animated, ActivityIndicator } from 'react-native';
import api from '../../../services/api';

import App from '../../../components/App';
import SlideButtonRoute from '../../../components/SlideButtonRoute';
import SlideListEdit from '../../../components/SlideListEdit';
import SlideButtonBack from '../../../components/SlideButtonBack';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';

export default function Country() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState(false);
    const [filters, setFilters] = useState(null);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async (body) => {
        setLoading(true);
        await api.post('filter/country', body).then(response => {
            let animateds = [];
            for (let index = 0; index < response.data.countries.length; index++) {
                animateds.push(new Animated.Value(0))
            }
            setCountries(response.data.countries);
            setLoading(false);
        })
    }

    return (
        <App style={{ justifyContent: 'space-between', alignItems: 'center' }}>

            <View style={{ width: '100%', height: '10%', justifyContent: 'space-between', alignItems: 'center' }}>
                <SlideButtonBack direction="left"/>
            </View>
            
            <View style={{ width: '100%', height: '65%', justifyContent: 'center'}}>
                {
                    loading 
                    ?
                    <ActivityIndicator size="large" color="#00fff7"/>
                    :
                        <FlatList
                            data={countries}    
                            renderItem={({item}) => (
                                <SlideListEdit
                                    direction="right"
                                    routeName="FormCountry"
                                    routeParams={{ country: item }}
                                    body={{
                                        id: item.id,
                                        title:item.name,
                                        itens: [], 
                                    }}
                                    height={50}
                                />
                            )}
                        />
                }
            </View>


            <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between',  height: '10%' }}>
                <Button
                    label="Filtrar"
                    icon="filter"
                    onPress={async () => {
                        loadList({order: ['name']});
                    }}
                    style={{ width: '48%' }}
                />
            </View>

            <View style={{ width: '100%', height: '10%', justifyContent: 'space-between', alignItems: 'center' }}>
                <SlideButtonRoute
                    direction="right"
                    routeName="FormCountry"
                    icon="plus"
                    label="Add"
                    height={50}
                />
            </View>

            <Modal visible={modal} title="Filtrar" onRequestClose={() => setModal(false)} icon="filter">

            </Modal>
        </App>
  );
}