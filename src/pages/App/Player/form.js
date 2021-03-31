import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Picker  } from 'react-native';
import api from '../../../services/api';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import App from '../../../components/App';
import Modal from '../../../components/Modal';
import ListTopcs from '../../../components/ListTopcs'
import InfoCard from '../../../components/InfoCard'

export default function Form({ route }) {
    const navigation = useNavigation();
    
    useEffect(() => {
        loadCountries();
        loadTeams();
    }, []);

    const loadCountries = async () => {
        setLoading(true);
        await api.get('country').then(response => {
            setCountries(response.data.countries);
            setLoading(false);
            setCountry(route.params?.player.country_id);
        })
    }

    const loadTeams = async () => {
        setLoading(true);
        await api.get('team').then(response => {
            setTeams(response.data.teams);
            setLoading(false);
            setTeam(route.params?.player.team_id);
        })
    }
    

    const [player, setPlayer] = useState(route.params?.player.name);
    const [playerInputError, setPlayerInputError] = useState(false);

    const [country, setCountry] = useState(null);
    const [countries, setCountries] = useState([]);

    const [team, setTeam] = useState(null);
    const [teams, setTeams] = useState([]);

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false });

    const [icon, setIcon] = useState(player ? 'edit' : 'save');

    const save = async () => {
        if((!player) || (player && !player.name)){
            setPlayerInputError(true);
            return;
        }

        setLoading(true);
        if(player?.id){
            await api.put(`player/${player.id}`, player).then(() => success()).catch(() => error('Erro ao atualizar', 'Erro no servidor. Aguarde e tente novamente em 1 minuto.'))
        } else {
            await api.post(`player`, player).then(() => success()).catch(() => error('Erro ao salvar', 'Erro no servidor. Aguarde e tente novamente em 1 minuto.'))
        }
    }

    const deleteItem = async () => {
        setLoading(true);
        if(player && player.id){
            await api.delete(`player/${player.id}`)
            .then(() => success())
            .catch(() => error('Erro ao deletar', [{
                title: 'Possiveis erros:',
                list: [ ' - País vinculado a outros registros', ' - Erro no servidor. Aguarde e tente novamente em 1 minuto.' ]
            }]))
        } else {
            navigation.navigate('Player')
        }
    }

    const success = () => {
        setIcon('check');
        setLoading(false);
        setTimeout(() => navigation.navigate('Player'), 1000)
    }

    const error = (title, list) => {
        setIcon('exclamation');
        setModal({ show: true, title, list });
        setLoading(false);
    }

    return (
        <App style={{ justifyContent: 'space-around', alignItems: 'center' }}>
            <InfoCard style={{ width: '20%', flexDirection: 'row', height: '10%' }} loading={loading} icon={icon}>
                <Text> {player?.id ?? 'NR'}  </Text>
            </InfoCard>

            <View style={{ width: '90%', height: '70%', margin: 60 }}>
                <Input
                    label="Nome"
                    value={player}
                    onChangeText={(name) => { setPlayer(name); setPlayerInputError(false); }}
                    loading={loading}
                    error={playerInputError}
                    errorText="Campo obrigatório"
                />

                <Picker selectedValue={country} onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
                    <Picker.Item label="Selecione o país" value={null}/>
                    { countries ? countries.map(country => (<Picker.Item label={country.name} value={country.id} />)) : null }
                </Picker>

                <Picker selectedValue={team} onValueChange={(itemValue, itemIndex) => setTeam(itemValue)}>
                    <Picker.Item label="Selecione o time" value={null}/>
                    { teams ? teams.map(teams => (<Picker.Item label={teams.name} value={teams.id} />)) : null }
                </Picker>
            </View>

            <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between',  height: '10%' }}>
                <Button label="SALVAR" icon="save" onPress={save} style={{ width: '48%', borderColor: '#26ff00' }}/>
                <Button label="DELETAR" icon="trash" onPress={deleteItem} style={{ width: '48%', borderColor: '#f00000' }}/>
            </View>

            <Modal visible={modal.show} title={modal.title} onRequestClose={() => setModal({ show: false })} icon="exclamation">
                <ListTopcs itens={modal.list}/>
            </Modal>
        </App>
    );
}