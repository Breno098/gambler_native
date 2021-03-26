import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import api from '../../../services/api';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import App from '../../../components/App';
import FloatCard from '../../../components/FloatCard';
import Modal from '../../../components/Modal';
import ListTopcs from '../../../components/ListTopcs'

export default function Form({ route }) {
    const navigation = useNavigation();
    
    const [country, setCountry] = useState(route.params?.country);
    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState({ show: false });

    const [icon, setIcon] = useState({name: country ? 'edit' : 'save'});

    const save = async () => {
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
                itens: [ 
                    ' - País vinculado a outros registros',
                    ' - Erro no servidor.'
                ]
            }]))
        } else {
            navigation.navigate('Country')
        }
    }

    const success = () => {
        setIcon({ name: 'check', color: '#00f018' });
        setLoading(false);
        setTimeout(() => navigation.navigate('Country'), 1000)
    }

    const error = (title, message) => {
        setIcon({ name: 'check', color: '#00f018' });
        setModal({ show: true, title, message });
        setLoading(false);
    }

    return (
        <App style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <FloatCard type="elevation" top={40} left={15} color='#00fff7' size="small" label={country?.id ?? 'NR'}/>
            <FloatCard type="elevation" top={40} left={345} color='#fff' size="small" icon={icon} loading={loading} elevation={0}/>
           
            <Modal 
                visible={modal.show} 
                title="Erro" 
                onRequestClose={() => setModal({ show: false })}
                icon="exclamation"
            >
                <ListTopcs itens={modal.message}/>
            </Modal>

            <View style={{ flexDirection: 'row', width: '90%', marginTop: 60  }}>
                <Input
                    label="Nome"
                    value={country ? country.name : null}
                    onChangeText={(name) => setCountry({ name, id: country ? country.id : null })}
                    loading={loading}
                />
            </View>

            <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
                <Button color='#00f018' label="SALVAR" icon="save" width='49.7%'  onPress={save} />
                <Button color='#f00000' label="DELETAR" icon="save" width='49.7%'  onPress={deleteItem}/>
            </View>
        </App>
    );
}