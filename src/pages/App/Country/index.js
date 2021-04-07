import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import api from '../../../services/api';

import App from '../../../components/App';
import SlideButtonRoute from '../../../components/SlideButtonRoute';
import SlideListEdit from '../../../components/SlideListEdit';
import TablePaginator from '../../../components/TablePaginator';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome';

import Table from '../../../components/Table';
import TableRow from '../../../components/TableRow';
import TableCell from '../../../components/TableCell';

export default function Country() {
    const [_countries, _setCountries] = useState([]);
    const [countries, setCountries] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);
    const [modalOrder, setModalOrder] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [orderParams, setOrderParams] = useState({});

    const [filterParams, setfilterParams] = useState('');

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);


    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        setCountries([]);
        setLoading(true);
        setErrorLoading(false);
        await api.get('country').then(response => {
            setCountries(response.data.countries);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setErrorLoading(true)
        })
    }

    return (
        <App style={{  }}>
            <Table 
                style={{ height: 400 }} 
                loading={loading}
                title="Países"
                actions={[{
                    icon: 'filter', 
                    onPress: () => alert('ellipsis-v')
                }]}
            >
                <TableRow>
                    <TableCell text={'ID'} type={'title'}/>
                    <TableCell text={'Nome'} type={'title'}/>
                </TableRow>
                { countries
                    .slice(
                        (page - 1) * perPage, 
                        (page - 1) * perPage + perPage
                    )
                    .map(country => (
                    <TableRow key={country.id}>
                        <TableCell text={country.id} />
                        <TableCell text={country.name} />
                    </TableRow>
                ))}
                
            </Table>
            <TablePaginator
                rows={countries.length}
                numberOfPages={countries.length / perPage}
                atualPage={page}
                next={() => page < (countries.length / perPage) ? setPage(page + 1) : null }
                previous={() => page > 1 ? setPage(page - 1) : null }
            />
           

            {/*             
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
            </Modal> */}
        </App>
  );
}