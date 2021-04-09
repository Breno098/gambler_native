import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import App from '../../../components/App';
import Button from '../../../components/Button';
import BreadCrumb from '../../../components/BreadCrumb';
import Input from '../../../components/Input';
import Card from '../../../components/Card';
import CardBody from '../../../components/CardBody';
import CardTitle from '../../../components/CardTitle';
import CardFooter from '../../../components/CardFooter';
import SwitchLabel from '../../../components/SwitchLabel';

export default function Filter({ route }) {

    const navigation = useNavigation();

    const [filterName, setFilterName] = useState(route?.params.filters.name);

    const [orderName, setOrderName] = useState(route?.params.orders.name ?? false);

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
                    label: 'Filtros',
                }]}
            />
            <Card style={{ height: '94%' }}>
                <CardTitle title={"Filtros"} icon={"filter"}/>
                <CardBody>
                    <Input
                        label={"Nome"}
                        value={filterName}
                        onChangeText={(text) => setFilterName(text) }
                        placeholder={"O nome deve contém"}
                    />
                </CardBody>

                <CardTitle title={"Ordem"} icon={"sort"}/>
                <CardBody>
                    <SwitchLabel 
                        label={"Nome"}
                        leftIcon={"times"}
                        rightIcon={"check"}
                        value={orderName}
                        onValueChange={() => setOrderName(!orderName)}
                    />
                </CardBody>
                <CardFooter style={{ justifyContent: 'space-between' }}>
                    <Button
                        style={{ width: '20%' }}
                        label={"Limpar"}
                        mode={"text"}
                        onPress={() => { 
                            navigation.navigate('Player', {
                                filters: { name: '' }, 
                                orders: { name: null }
                            })
                        }}
                    />   
                    <Button
                        style={{ width: '80%' }}
                        label={"Filtrar"}
                        icon={"filter"}
                        onPress={() => { 
                            navigation.navigate('Player', {
                                filters: { name: filterName }, 
                                orders: { name: orderName ? true : null }
                            })
                        }}
                    />   
                </CardFooter>
            </Card>
        </App>
    );
}