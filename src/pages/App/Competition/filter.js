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

export default function Filter({ route }) {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const [filterName, setFilterName] = useState(route?.params.filters.name);
    const [filterCountry, setFilterCountry] = useState(route?.params.filters.country_id);

    const [orderName, setOrderName] = useState(route?.params.orders.name ?? false);

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        loadTeams();
    }, [])

    const loadTeams = async () => {
        setCountries([]);
        setLoading(true);
        await api.get('country').then(response => {
            response.data.countries.forEach(team => {
                setCountries(oldArray => [...oldArray, {
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
                    label: 'Competições',
                    route: 'Competitions'
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
                    </CardBody>

                    <CardTitle title={"Ordem"} icon={"sort"}/>
                    <CardBody>
                        <SwitchLabel 
                            label={"Nome"}
                            leftIcon={"times"}
                            rightIcon={"check"}
                            value={orderName}
                            onValueChange={() => setOrderName(!orderName) }
                        />
                    </CardBody>
                </ScrollView>

                <CardFooter style={{ justifyContent: 'space-between' }}>
                    <Button
                        style={{ width: '20%' }}
                        label={"Limpar"}
                        mode={"text"}
                        onPress={() => { 
                            navigation.navigate('Competition', {
                                filters: { 
                                    name: '',
                                }, 
                                orders: { 
                                    name: null,
                                }
                            })
                        }}
                    />   
                    <Button
                        style={{ width: '80%' }}
                        label={"Filtrar"}
                        icon={"filter"}
                        onPress={() => { 
                            navigation.navigate('Competition', {
                                filters: { 
                                    name: filterName,
                                }, 
                                orders: { 
                                    name: orderName ? true : null,
                                }
                            })
                        }}
                    />   
                </CardFooter>
            </Card>
        </App>
    );
}