import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import api from '../../../services/api';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import App from '../../../components/App';
import Modal from '../../../components/Modal';
import ListTopcs from '../../../components/ListTopcs'
import SlideButtonBack from '../../../components/SlideButtonBack';
import InfoCard from '../../../components/InfoCard'

export default function Form({ route }) {
    const navigation = useNavigation();

    const [country, setCountry] = useState(route.params?.country);
    const [countryInputError, setCountryInputError] = useState(false);

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false });

    const [icon, setIcon] = useState(country ? 'edit' : 'save');

    const save = async () => {
        if((!country) || (country && !country.name)){
            setCountryInputError(true);
            return;
        }
        setLoading(true);
        if(country && country.id){
            await api.put(`country/${country.id}`, country)
                .then(()  => success())
                .catch(() => error('Erro ao atualizar', 'Erro no servidor. Aguarde e tente novamente em 1 minuto.'))
        } else {
            await api.post(`country`, country)
                .then(() => success())
                .catch(() => error('Erro ao salvar', 'Erro no servidor. Aguarde e tente novamente em 1 minuto.'))
        }
    }

    const deleteItem = async () => {
        setLoading(true);
        if(country && country.id){
            await api.delete(`country/${country.id}`)
            .then(() => success())
            .catch(() => error('Erro ao deletar', [{
                title: 'Possiveis erros:',
                list: [ ' - País vinculado a outros registros', ' - Erro no servidor. Aguarde e tente novamente em 1 minuto.' ]
            }]))
        } else {
            navigation.navigate('Country')
        }
    }

    const success = () => {
        setIcon('check');
        setLoading(false);
        setTimeout(() => navigation.navigate('Country'), 1000)
    }

    const error = (title, list) => {
        setIcon('exclamation');
        setModal({ show: true, title, list });
        setLoading(false);
    }

    return (
        <App style={{ justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center', height: '10%' }}>
                <View style={{ width: '75%' }}>
                    <SlideButtonBack direction="left"/>
                </View>
                <InfoCard style={{ width: '20%', flexDirection: 'row' }} loading={loading} icon={icon}>
                    <Text> {country?.id ?? 'NR'}  </Text>
                </InfoCard>
            </View>

            <View style={{ width: '90%', height: '70%', margin: 60 }}>
                <Input
                    label="Nome"
                    value={country ? country.name : null}
                    onChangeText={(name) => { 
                        setCountry({ name, id: country ? country.id : null });
                        setCountryInputError(false);
                    }}
                    loading={loading}
                    error={countryInputError}
                    errorText="Campo obrigatório"
                />
            </View>

            <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between',  height: '10%' }}>
                <Button
                    label="SALVAR"
                    icon="save"
                    onPress={save}
                    style={{ width: '48%', borderColor: '#26ff00'  }}
                />
                <Button
                    label="DELETAR"
                    icon="trash"
                    onPress={deleteItem}
                    style={{ width: '48%', borderColor: '#f00000'  }}
                />
            </View>

            <Modal visible={modal.show} title={modal.title} onRequestClose={() => setModal({ show: false })} icon="exclamation">
                <ListTopcs itens={modal.list}/>
            </Modal>
        </App>
    );
}