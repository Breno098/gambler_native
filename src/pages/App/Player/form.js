import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard , ScrollView, Text } from 'react-native';
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
import GroupButton from '../../../components/GroupButton';

export default function Form({ route }) {
    
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [playerNameInputError, setPlayerNameInputError] = useState(false);
    const [countrySelectError, setCountrySelectError] = useState(false);
    const [teamSelectError, setTeamSelectError] = useState(false);
    const [positionError, setPositionError] = useState(false);

    const [playerId] = useState(route?.params ? route?.params.player.id : null);
    const [playerName, setPlayerName] = useState(route?.params ? route?.params.player.name : '');
    const [playerPosition, setPlayerPosition] = useState(route?.params ? route?.params.player.position : '');

    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState(route?.params ? route?.params.player.country.id.toString() : null);

    const [teams, setTeams] = useState([]);
    const [teamId, setTeamId] = useState(route?.params ? route?.params.player.team.id.toString() : null);

    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        loadCountries();
        loadTeams();
    }, [])

    const loadCountries = async () => {
        setCountries([]);
        setLoading(true);
        await api.get('country').then(response => {
            response.data.countries.forEach(country => {
                setCountries(oldArray => [...oldArray, {
                    label: country.name,
                    value: country.id,
                }]);
            })
            setLoading(false);
        }).catch((error) => {
            console.log(error.response.data)
            setLoading(false);
        })
    }

    const loadTeams = async () => {
        setTeams([]);
        setLoading(true);
        await api.get('team').then(response => {
            response.data.teams.forEach(team => {
                setTeams(oldArray => [...oldArray, {
                    label: team.name,
                    value: team.id,
                }]);
            })
            setLoading(false);
        }).catch((error) => {
            console.log(error.response.data)
            setLoading(false);
        })
    }

    const removeErrorAndSelectCountry = (index, value) => {
        setCountryId(index);
        setCountrySelectError(false)
    }

    const removeErrorAndSelectTeam = (index, value) => {
        setTeamId(index);
        setTeamSelectError(false)
    }

    const removeErrorAndSelectPosition = (value) => {
        setPlayerPosition(value);
        setPositionError(false)
    }

    const save = async () => {
        setPlayerNameInputError(!playerName);
        setCountrySelectError(!countryId);
        setTeamSelectError(!teamId)
        setPositionError(!playerPosition)

        if(!playerName || !countryId || !teamId || !playerPosition){
            return;
        }

        Keyboard.dismiss();
        setLoading(true);

        let player = {
            id: playerId,
            name: playerName,
            country_id: countryId,
            team_id: teamId,
            position: playerPosition
        }

        if(playerId){
            await api.put(`player/${playerId}`, player).then(()  => navigation.navigate('Player', { refresh: new Date }) ) 
        } else {
            await api.post(`player`, player).then(() => navigation.navigate('Player', { refresh: new Date  }) )
        }
    }

    const deleteItem = async () => {
        setLoading(true);
        await api.delete(`player/${playerId}`).then(() => navigation.navigate('Player', { refresh: new Date  }) )
    }

    return (
        <App style={{ justifyContent: 'space-between', alignItems: 'center' }} >
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

            <Card style={{ height: '97%' }} transparent>
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

                    <Select
                        icon={'globe'}
                        label="Países"
                        itens={countries}
                        indexValueInitial={countryId}
                        onItemPress={(index, value) => removeErrorAndSelectCountry(index)}
                        error={countrySelectError}
                        errorText="Selecione um país"
                        loading={loading}
                    />

                    <Select
                        icon={'users'}
                        label="Times"
                        itens={teams}
                        indexValueInitial={teamId}
                        onItemPress={(index, value) => removeErrorAndSelectTeam(index)}
                        error={teamSelectError}
                        errorText="Selecione um time"
                        loading={loading}
                    />

                    <GroupButton
                        label="Posição"
                        icon={'street-view'}
                        error={positionError}
                        errorText="Selecione uma posição"
                        itens={[{
                            text: 'ATA', 
                            color: 'rgba(255, 0, 0, 0.7)', 
                            onPress: () => removeErrorAndSelectPosition('ATA'),
                            active: playerPosition === 'ATA'
                        }, {
                            text: 'MEI', 
                            color: 'rgba(0, 255, 0, 0.5)', 
                            onPress: () => removeErrorAndSelectPosition('MEI'),
                            active: playerPosition === 'MEI'
                        }, {
                            text: 'VOL', 
                            color: 'rgba(0, 255, 0, 0.5)',
                            onPress: () => removeErrorAndSelectPosition('VOL'),
                            active: playerPosition === 'VOL'
                        }, {
                            text: 'ZAG', 
                            color: '#03eeff', 
                            onPress: () => removeErrorAndSelectPosition('ZAG'),
                            active: playerPosition === 'ZAG'
                        },  {
                            text: 'LAT', 
                            color: '#03eeff',
                            onPress: () => removeErrorAndSelectPosition('LAT'),
                            active: playerPosition === 'LAT' 
                        }, {
                            text: 'GOL', 
                            color: '#ff9626', 
                            onPress: () => removeErrorAndSelectPosition('GOL'),
                            active: playerPosition === 'GOL'
                        }]}
                    />
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
                        <Text style={{ fontSize: 15 }}> Excluir {playerName} ?</Text>
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