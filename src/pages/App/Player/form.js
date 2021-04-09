import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard , Text } from 'react-native';
import api from '../../../services/api';

import Input from '../../../components/Input';
import App from '../../../components/App';
import Button from '../../../components/Button';
import BreadCrumb from '../../../components/BreadCrumb';
import Card from '../../../components/Card';
import CardTitle from '../../../components/CardTitle';
import CardBody from '../../../components/CardBody';
import CardFooter from '../../../components/CardFooter';
import Dialog from '../../../components/Dialog';

import Select from '../../../components/Select';
import SelectOption from '../../../components/SelectOption';

export default function Player({ route }) {
    
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [playerNameInputError, setPlayerNameInputError] = useState(false);

    const [playerId, setPlayerId] = useState(route?.params ? route?.params.player.id : null);
    const [playerName, setPlayerName] = useState(route?.params ? route?.params.player.name : '');

    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState(route?.params ? route?.params.player.country.id.toString() : null);

    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        loadCountries();
    }, [])

    const loadCountries = async () => {
        setCountries([]);
        setLoading(true);

        await api.get('country').then(response => {
            setCountries(response.data.countries);
            setLoading(false);
        }).catch((error) => {
            console.log(error.response.data)
            setLoading(false);
        })
    }


    const save = async () => {
        if(!playerName){
            setPlayerNameInputError(true);
            return;
        }

        Keyboard.dismiss();
        setLoading(true);

        let player = {
            id: playerId,
            name: playerName
        }

        if(playerId){
            await api.put(`player/${playerId}`, player)
                .then(()  => { 
                    navigation.navigate('Player', { refresh: new Date  })
                })
        } else {
            await api.post(`player`, player)
                .then(() =>  {
                    navigation.navigate('Player', { refresh: new Date  })
                })
        }
    }

    const deleteItem = async () => {
        setLoading(true);
        await api.delete(`player/${playerId}`)
        .then(() => {
            navigation.navigate('Player', { refresh: new Date  })
        })
    }

    return (
        <App style={{ }}>
            <BreadCrumb
                itens={[{
                    label: 'Cadastros',
                    route: 'Registrations'
                }, {
                    label: 'Jogadores',
                    route: 'Player'
                }, {
                    label: playerId ? 'Alterar' : 'Cadastrar',
                }]}
            />

            <Card style={{ height: '94%' }} >
                <CardTitle 
                    title={playerId ? 'Alterar' : 'Cadastrar'}
                    icon={playerId ? 'edit' : 'plus'}
                />

                <CardBody>
                    <Input
                        label="Nome"
                        value={playerName}
                        onChangeText={(text) => { 
                            setPlayerName(text);
                            setPlayerNameInputError(false);
                        }}
                        error={playerNameInputError}
                        errorText="Campo obrigatório"
                        loading={loading}
                    />

                    <Input
                        label="countryId"
                        value={countryId}
                        loading={loading}
                    />

                    <Select>
                        <SelectOption value={null} label="Selecione"/>
                        {
                            countries.map(country => <SelectOption value={country.id} label={country.name}/> )
                        }
                    </Select>
                </CardBody>

                <CardFooter style={{ justifyContent: 'space-between' }}>
                    <Button
                        label="Salvar"
                        color="rgba(0, 255, 0, 0.5)"
                        icon="save"
                        onPress={save}
                        style={{ width: playerId ? '69%' : '100%' }}
                        loading={loading}
                    />
                    {
                        playerId ? 
                            <Button
                                label="Deletar"
                                color="rgba(255, 0, 0, 0.5)"
                                icon="trash"
                                onPress={() => setDialog(true)}
                                style={{ width: '29%' }}
                                loading={loading}
                            /> 
                        : null
                    }
                </CardFooter>
            </Card>

            <Dialog visible={dialog} onRequestClose={() => setDialog(false)}>
                <Card style={{ width: '90%', height: 200 }}>
                    <CardTitle title={'Confirmar'}/>

                    <CardBody>
                        <Text style={{ fontSize: 15 }}>
                            Excluir {playerName} ?
                        </Text>
                    </CardBody>

                    <CardFooter style={{ justifyContent: 'flex-end' }}>
                        <Button
                            color="rgba(255, 0, 0, 0.5)"
                            icon="times"
                            onPress={() => setDialog(false)}
                            style={{ width: '20%', marginRight: 5 }}
                        />
                        <Button
                            color="rgba(0, 255, 0, 0.5)"
                            icon="check"
                            onPress={deleteItem}
                            style={{ width: '30%' }}
                            loading={loading}
                        />
                    </CardFooter>
                </Card>
            </Dialog>
        </App>
    );
}