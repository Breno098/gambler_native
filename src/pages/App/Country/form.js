import React, { useState } from 'react';
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

export default function Form({ route }) {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [countryInputError, setCountryInputError] = useState(false);

    const [countryId, setCountryId] = useState(route?.params ? route?.params.country.id : null);
    const [countryName, setCountryName] = useState(route?.params ? route?.params.country.name : '');

    const [dialog, setDialog] = useState(false);

    const save = async () => {
        if(!countryName){
            setCountryInputError(true);
            return;
        }

        Keyboard.dismiss();
        setLoading(true);

        let country = {
            id: countryId,
            name: countryName
        }

        if(countryId){
            await api.put(`country/${countryId}`, country)
                .then(()  => { 
                    navigation.navigate('Country', { refresh: new Date  })
                })
        } else {
            await api.post(`country`, country)
                .then(() =>  {
                    navigation.navigate('Country', { refresh: new Date  })
                })
        }
    }

    const deleteItem = async () => {
        setLoading(true);
        await api.delete(`country/${countryId}`)
        .then(() => {
            navigation.navigate('Country', { refresh: new Date  })
        })
    }

    return (
        <App style={{ }}>
            <BreadCrumb
                itens={[{
                    label: 'Cadastros',
                    route: 'Registrations'
                }, {
                    label: 'Países',
                    route: 'Country'
                }, {
                    label: countryId ? 'Alterar' : 'Cadastrar',
                }]}
            />

            <Card style={{ height: '94%' }} >
                <CardTitle 
                    title={countryId ? 'Alterar' : 'Cadastrar'}
                    icon={countryId ? 'edit' : 'plus'}
                />

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
                        color="rgba(0, 255, 0, 0.5)"
                        icon="save"
                        onPress={save}
                        style={{ width: countryId ? '69%' : '100%' }}
                        loading={loading}
                    />
                    {
                        countryId ? 
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
                            Excluir {countryName} ?
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