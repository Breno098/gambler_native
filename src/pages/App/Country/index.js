import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import api from '../../../services/api';

import App from '../../../components/App';
import SlideButtonRoute from '../../../components/SlideButtonRoute';
import SlideListEdit from '../../../components/SlideListEdit';
import SlideButtonBack from '../../../components/SlideButtonBack';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Country() {
    const [_countries, _setCountries] = useState([]);
    const [countries, setCountries] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);
    const [modalOrder, setModalOrder] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [orderParams, setOrderParams] = useState({});

    const [filterParams, setfilterParams] = useState('');

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        setLoading(true);
        setErrorLoading(false);
        await api.get('country').then(response => {
            setCountries(response.data.countries);
            _setCountries(response.data.countries)
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setErrorLoading(true)
        })
    }

    const filter = (search) => {
        if(!search || search === ''){
            setCountries(_countries); 
            return;
        }

        let list = _countries.filter(country => country.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        setCountries(list); 
    }
    
    const order = async (field) => {
        let type = (orderParams.type === 'asc' || !orderParams.type) && orderParams.field === field ? 'desc' : 'asc';
        setOrderParams({ field, type });
        setCountries([]);
        _setCountries( 
            type === 'asc' ? _countries.sort((a, b) => (a[field] > b[field]) ? 1 : -1) : _countries.sort((a, b) => (a[field] < b[field]) ? 1 : -1) 
        ); 
        setCountries( 
            type === 'asc' ? countries.sort((a, b) => (a[field] > b[field]) ? 1 : -1) : countries.sort((a, b) => (a[field] < b[field]) ? 1 : -1) 
        ); 
    }

    const iconOrder = (field) => {
        return (orderParams.type === 'desc' || !orderParams.type) && orderParams.field === field ? 'sort-up'  : orderParams.field === field ? 'sort-down' : 'minus'
    }

    const colorButtonOrder = (field) => {
        return orderParams.field === field ? "#00fff7" : null
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
                    errorLoading
                    ?
                    <View style={{ width: '100%', height: '65%', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name="exclamation" size={35} color="#f00000" style={{ margin: 'auto' }} />
                        <Text style={{ fontSize: 15, color: '#f00000', marginTop: 15 }}> Error ao carregar registros </Text>
                    </View>
                    :
                        <FlatList
                            data={countries}
                            renderItem={({item, index}) => (
                                <SlideListEdit
                                    key={index}
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
                    onPress={() => setModalFilter(true)}
                    style={{ width: '48%' }}
                />
                <Button
                    label="Ordenar"
                    icon="sort"
                    style={{ width: '48%' }}
                    onPress={() => setModalOrder(true)}
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

            <Modal visible={modalOrder} title="Ordernar" onRequestClose={() => setModalOrder(false)} icon="sort" style={{ height: 200 }}>
                <View style={{ width: '90%', height: '85%', justifyContent: 'flex-start', marginTop: 15 }}>
                        <Button 
                            label="Por ID" 
                            icon={iconOrder('id')} 
                            onPress={() => order('id')} 
                            style={{ width: '100%', marginBottom: 15 }} 
                            color={colorButtonOrder('id')}
                            loading={loading}
                        />
                        <Button 
                            label="Por nome" 
                            icon={iconOrder('name')} 
                            onPress={() => order('name')} 
                            style={{ width: '100%' }} 
                            color={colorButtonOrder('name')}
                            loading={loading}
                        />
                </View>
            </Modal>

            <Modal visible={modalFilter} title="Filtrar" onRequestClose={() => setModalFilter(false)} icon="filter" style={{ height: 200 }}>
                <View style={{ width: '90%', height: '85%', justifyContent: 'flex-start', marginTop: 15 }}>
                    <Input
                        label="Nome"
                        value={filterParams}
                        onChangeText={(text) => filter(text)}
                        loading={loading}
                    />
                </View>
            </Modal>
        </App>
  );
}