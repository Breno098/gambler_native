import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

import App from '../../../components/App';
import Button from '../../../components/Button';
import BreadCrumb from '../../../components/BreadCrumb';
import Input from '../../../components/Input';
import Card from '../../../components/Card';
import CardBody from '../../../components/CardBody';
import CardTitle from '../../../components/CardTitle';
import CardFooter from '../../../components/CardFooter';
import SwitchLabel from '../../../components/SwitchLabel';
import Select from '../../../components/Select';
import GroupButton from '../../../components/GroupButton';

export default function Filter({ route }) {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [filterName, setFilterName] = useState(route?.params.filters.name);
    const [filterTeam, setFilterTeam] = useState(route?.params.filters.team_id);
    const [filterPosition, setFilterPosition] = useState(route?.params.filters.position);

    const [orderName, setOrderName] = useState(route?.params.orders.name ?? false);
    const [orderPosition, setOrderPosition] = useState(route?.params.orders.position ?? false);

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        loadTeams();
    }, [])

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
                    label: 'Filtrar e ordenar',
                }]}
            />

            <Card style={{ height: '97%' }} transparent>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CardTitle title={"Filtros"} icon={"filter"}/>
                    <CardBody>
                        <Input
                            label={"Nome"}
                            value={filterName}
                            onChangeText={(text) => setFilterName(text) }
                        />

                    <Select
                        icon={'users'}
                        label="Time"
                        itens={teams}
                        indexValueInitial={filterTeam}
                        onItemPress={(index, value) => setFilterTeam(index)}
                        loading={loading}
                    />

                    <GroupButton
                        label="Posi????o"
                        icon={'street-view'}
                        itens={[{
                            text: 'ATA', 
                            color: 'rgba(255, 0, 0, 0.7)', 
                            onPress: () => setFilterPosition('ATA'),
                            active: filterPosition === 'ATA'
                        }, {
                            text: 'MEI', 
                            color: 'rgba(0, 255, 0, 0.5)', 
                            onPress: () => setFilterPosition('MEI'),
                            active: filterPosition === 'MEI'
                        }, {
                            text: 'VOL', 
                            color: 'rgba(0, 255, 0, 0.5)',
                            onPress: () => setFilterPosition('VOL'),
                            active: filterPosition === 'VOL'
                        }, {
                            text: 'ZAG', 
                            color: '#03eeff', 
                            onPress: () => setFilterPosition('ZAG'),
                            active: filterPosition === 'ZAG'
                        },  {
                            text: 'LAT', 
                            color: '#03eeff',
                            onPress: () => setFilterPosition('LAT'),
                            active: filterPosition === 'LAT' 
                        }, {
                            text: 'GOL', 
                            color: '#ff9626', 
                            onPress: () => setFilterPosition('GOL'),
                            active: filterPosition === 'GOL'
                        }]}
                    />
                    </CardBody>

                    <CardTitle title={"Ordem"} icon={"sort"}/>
                    <CardBody>
                        <SwitchLabel 
                            label={"Nome"}
                            leftIcon={"times"}
                            rightIcon={"check"}
                            value={orderName}
                            onValueChange={() => { 
                                setOrderName(!orderName)
                                setOrderPosition(false)
                            }}
                        />
                        <SwitchLabel 
                            label={"Posi????o"}
                            leftIcon={"times"}
                            rightIcon={"check"}
                            value={orderPosition}
                            onValueChange={() => { 
                                setOrderPosition(!orderPosition)
                                setOrderName(false)
                            }}
                        />
                    </CardBody>
                </ScrollView>

                <CardFooter style={{ justifyContent: 'space-between' }}>
                    <Button
                        style={{ width: '20%' }}
                        label={"Limpar"}
                        mode={"text"}
                        onPress={() => { 
                            navigation.navigate('Player', {
                                filters: { 
                                    name: '',
                                    team_id : '',
                                    position: ''
                                }, 
                                orders: { 
                                    name: null,
                                    position: null 
                                }
                            })
                        }}
                    />   
                    <Button
                        style={{ width: '80%' }}
                        label={"Filtrar"}
                        icon={"filter"}
                        onPress={() => { 
                            navigation.navigate('Player', {
                                filters: { 
                                    name: filterName,
                                    team_id : filterTeam,
                                    position: filterPosition
                                }, 
                                orders: { 
                                    name: orderName ? true : null,
                                    position: orderPosition ? true : null,
                                }
                            })
                        }}
                    />   
                </CardFooter>
            </Card>
        </App>
    );
}