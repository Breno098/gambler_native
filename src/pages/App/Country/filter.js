import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import App from '../../../components/App';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Card from '../../../components/Card';
import CardBody from '../../../components/CardBody';
import CardTitle from '../../../components/CardTitle';
import CardFooter from '../../../components/CardFooter';
import SwitchLabel from '../../../components/SwitchLabel';

export default function Filter({ route }) {

    const navigation = useNavigation();

    const [filterName, setFilterName] = useState(route?.params.filters.name);

    const [orderName, setOrderName] = useState(route?.params.orders.name ?? true);

    return (
        <App style={{ }}>
            <Card style={{ height: '100%' }}>
                <CardTitle title="Filtros" icon="filter"/>
                <CardBody>
                    <Input
                        label="Nome"
                        value={filterName}
                        onChangeText={(text) => setFilterName(text) }
                        placeholder="O nome deve contém"
                    />
                </CardBody>

                <CardTitle title="Ordem" icon="sort"/>
                <CardBody>
                    <SwitchLabel 
                        label="Nome"
                        leftIcon="arrow-up"
                        rightIcon="arrow-down"
                        value={orderName}
                        onValueChange={() => setOrderName(!orderName)}
                    />
                </CardBody>
                <CardFooter style={{ justifyContent: 'space-between' }}>
                    <Button
                        style={{ width: '59%' }}
                        label="Filtrar"
                        icon="filter"
                        onPress={() => { 
                            navigation.navigate('Country', {
                                filters: {
                                    name: filterName
                                }, 
                                orders: {
                                    name: orderName
                                }
                            })
                        }}
                    />   
                    <Button
                        style={{ width: '39%' }}
                        label="Limpar filtros"
                        color="rgba(247, 106, 5, 0.5)"
                        icon="eraser"
                        onPress={() => { 
                            navigation.navigate('Country', {
                                filters: {
                                    name: ''
                                }, 
                                orders: {
                                    name: true
                                }
                            })
                        }}
                    />   
                </CardFooter>
            </Card>
        </App>
    );
}