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

export default function Player() {
    const [_players, _setPlayers] = useState([]);
    const [players, setPlayers] = useState([]);
    
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
        await api.get('filter/player').then(response => {
            setPlayers(response.data.players);
            _setPlayers(response.data.players)
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setErrorLoading(true)
        })
    }

    const filter = (search) => {
        if(!search || search === ''){
            setPlayers(_players); 
            return;
        }

        let list = _players.filter(player => player.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        setPlayers(list); 
    }
    
    const order = async (field) => {
        let type = (orderParams.type === 'asc' || !orderParams.type) && orderParams.field === field ? 'desc' : 'asc';
        setOrderParams({ field, type });
        setPlayers([]);
        _setPlayers( 
            type === 'asc' ? _players.sort((a, b) => (a[field] > b[field]) ? 1 : -1) : _players.sort((a, b) => (a[field] < b[field]) ? 1 : -1) 
        ); 
        setPlayers( 
            type === 'asc' ? players.sort((a, b) => (a[field] > b[field]) ? 1 : -1) : players.sort((a, b) => (a[field] < b[field]) ? 1 : -1) 
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
                            data={players}
                            renderItem={({item, index}) => (
                                <SlideListEdit
                                    key={index}
                                    direction="right"
                                    routeName="FormPlayer"
                                    routeParams={{ player: item }}
                                    body={{
                                        id: item.id,
                                        title: item.name,
                                        itens: [
                                            'Time: ' + item?.team.name,
                                            'País: ' + item?.country.name,
                                            'Posição: ' + item?.position
                                        ], 
                                    }}
                                    height={90}
                                />
                            )}
                        />
                }
            </View>

            <View style={{ width: '100%', height: '10%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <SlideButtonRoute
                    direction="right"
                    routeName="FormPlayer"
                    icon="plus"
                    label="Add"
                    height={50}
                />
            </View>

            <Modal visible={modalOrder} title="Ordernar" onRequestClose={() => setModalOrder(false)} icon="sort" style={{ height: 300 }}>
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
                            style={{ width: '100%', marginBottom: 15 }} 
                            color={colorButtonOrder('name')}
                            loading={loading}
                        />
                         <Button 
                            label="Por posição" 
                            icon={iconOrder('team')} 
                            onPress={() => order('team')} 
                            style={{ width: '100%' }} 
                            color={colorButtonOrder('team')}
                            loading={loading}
                        />
                </View>
            </Modal>

            <Modal visible={modalFilter} title="Filtrar" onRequestClose={() => setModalFilter(false)} icon="filter" style={{ height: 400 }}>
                <View style={{ width: '90%', height: '85%', justifyContent: 'flex-start', marginTop: 15 }}>
                    <Input
                        label="Nome"
                        value={filterParams}
                        onChangeText={(text) => filter(text)}
                        loading={loading}
                    />
                    <Input
                        label="Time"
                        value={filterParams}
                        onChangeText={(text) => filter(text)}
                        loading={loading}
                    />
                </View>
            </Modal>
        </App>
  );
}