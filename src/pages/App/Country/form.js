import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import api from '../../../services/api';

import Input from '../../../components/Input';
import Modal from '../../../components/Modal';
import ListTopcs from '../../../components/ListTopcs'
import SlideButtonBack from '../../../components/SlideButtonBack';
import InfoCard from '../../../components/InfoCard'

import App from '../../../components/App';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import TableRow from '../../../components/TableRow';
import TableCell from '../../../components/TableCell';
import TablePaginator from '../../../components/TablePaginator';
import Card from '../../../components/Card';
import CardBody from '../../../components/CardBody';
import CardFooter from '../../../components/CardFooter';

export default function Form({ route }) {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [countryInputError, setCountryInputError] = useState(false);

    const [countryId, setCountryId] = useState(null);
    const [countryName, setCountryName] = useState('');

    const save = async () => {
        if(!countryName){
            setCountryInputError(true);
            return;
        }

        setLoading(true);
        alert('salvando...');

        let country = {
            id: countryId,
            name: countryName
        }

        if(countryId){
            await api.put(`country/${countryId}`, country)
                .then(()  => { 
                    alert('atualizado com Sucesso');
                    navigation.navigate('Country', {
                        refresh: new Date 
                    })
                })
        } else {
            await api.post(`country`, country)
                .then(() =>  {
                    alert('Salvo com Sucesso');
                    navigation.navigate('Country', {
                        refresh: new Date 
                    })
                })
        }
    }

    const deleteItem = async () => {
        setLoading(true);
        if(country && country.id){
            await api.delete(`country/${country.id}`)
            .then(() => alert('ok'))
            
        } else {
            navigation.navigate('Country')
        }
    }

    return (
        <App style={{ }}>
            <Card style={{ height: '100%' }} >
                <CardBody>
                    <Input
                        label="Nome"
                        value={countryName}
                        onChangeText={(text) => { 
                            setCountryName(text);
                            setCountryInputError(false);
                        }}
                        error={countryInputError}
                        errorText="Campo obrigatório"
                        loading={loading}
                    />
                </CardBody>

                <CardFooter style={{ justifyContent: 'space-between' }}>
                    <Button
                        label="Salvar"
                        color="#0dff05"
                        icon="save"
                        onPress={save}
                        style={{ width: '49%' }}
                        loading={loading}
                    />
                </CardFooter>
            </Card>
        </App>
    );
}