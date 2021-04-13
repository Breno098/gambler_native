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
    const [stadiumNameInputError, setStadiumNameInputError] = useState(false);
    const [countrySelectError, setCountrySelectError] = useState(false);

    const [stadiumId] = useState(route?.params ? route?.params.stadium.id : null);
    const [stadiumName, setStadiumName] = useState(route?.params ? route?.params.stadium.name : '');

    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState(route?.params ? route?.params.stadium.country.id.toString() : null);

    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        loadCountries();
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

    const removeErrorAndSelectCountry = (index, value) => {
        setCountryId(index);
        setCountrySelectError(false)
    }

    const save = async () => {
        setStadiumNameInputError(!stadiumName);
        setCountrySelectError(!countryId);

        if(!stadiumName || !countryId ){
            return;
        }

        Keyboard.dismiss();
        setLoading(true);

        let stadium = {
            id: stadiumId,
            name: stadiumName,
            country_id: countryId,
        }

        if(stadiumId){
            await api.put(`stadium/${stadiumId}`, stadium).then(()  => navigation.navigate('Stadium', { refresh: new Date }) ) 
        } else {
            await api.post(`stadium`, stadium).then(() => navigation.navigate('Stadium', { refresh: new Date  }) )
        }
    }

    const deleteItem = async () => {
        setLoading(true);
        await api.delete(`stadium/${stadiumId}`).then(() => navigation.navigate('Stadium', { refresh: new Date  }) )
    }

    return (
        <App style={{ justifyContent: 'space-between', alignItems: 'center' }} >
            <BreadCrumb
                itens={[{
                    label: 'Cadastros',
                    route: 'Registrations'
                }, {
                    label: 'Estádios',
                    route: 'Stadium'
                }, {
                    label: stadiumId ? 'Alterar' : 'Cadastrar',
                }]}
            />

            <Card style={{ height: '97%' }} transparent>
                <CardTitle 
                    title={stadiumId ? 'Alterar' : 'Cadastrar'}
                    icon={stadiumId ? 'edit' : 'plus'}
                />

                <CardBody>
                    <Input
                        label="Nome"
                        value={stadiumName}
                        onChangeText={(text) => { 
                            setStadiumName(text);
                            setStadiumNameInputError(false);
                        }}
                        error={stadiumNameInputError}
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
                </CardBody>

                <CardFooter style={{ justifyContent: 'space-between' }}>
                    <Button
                        label="Salvar"
                        color="rgba(0, 255, 0, 0.5)"
                        icon="save"
                        onPress={save}
                        style={{ width: stadiumId ? '69%' : '100%' }}
                        loading={loading}
                    />
                    {
                        stadiumId ? 
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
                        <Text style={{ fontSize: 15 }}> Excluir {stadiumName} ?</Text>
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