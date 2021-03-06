import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard , View , Text, Image, ScrollView } from 'react-native';
import api from '../../../services/api';

import * as ImagePicker from 'expo-image-picker';

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

import ImageSelect from '../../../components/ImageSelect';
import Switch from '../../../components/Switch';
import List from '../../../components/List';
import ListItem from '../../../components/ListItem';

export default function Form({ route }) {
    
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [teamNameInputError, setTeamNameInputError] = useState(false);
    const [countrySelectError, setCountrySelectError] = useState(false);
    const [photoError, setPhotoError] = useState(false);

    const [teamId] = useState(route?.params ? route?.params.team.id : null);
    const [teamName, setteamName] = useState(route?.params ? route?.params.team.name : '');

    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState(route?.params ? route?.params.team.country.id.toString() : null);

    const [competitions, setCompetitions] = useState([]);
    const [competitionsIds, setCompetitionsIds] = useState([]);

    const [dialog, setDialog] = useState(false);

    const [image, setImage] = useState(route?.params ? 'http://btpkq8ic.srv-45-34-12-242.webserverhost.top/storage/teams/' + route?.params.team.name_photo : null);

    useEffect(() => {
        loadCountries();
        loadCompetitions();
        permissionImage()

        route?.params && route?.params.team.competitions.forEach(comp => setCompetitionsIds(oldArray => [...oldArray, comp.id ]) );
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [5, 4],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

    const permissionImage = async() => {
        if (React.Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Necess??rio permiss??o para upload de imagem!');
            }
        }
    }

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

    const loadCompetitions = async () => {
        setCompetitions([]);
        setLoading(true);
        await api.get('competition').then(response => {
            setCompetitions(response.data.competitions);
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
    
    const activeCompetition = (id) => {
        if( competitionsIds.filter(comp => comp === id).length > 0 ){
            setCompetitionsIds( competitionsIds.filter(comp => comp !== id) )
        } else {
            setCompetitionsIds(oldArray => [...oldArray, id ]);
        }
    }

    const save = async () => {
        setTeamNameInputError(!teamName);
        setCountrySelectError(!countryId);
        setPhotoError(!image)

        if(!teamName || !countryId || !image){
            return;
        }

        Keyboard.dismiss();
        setLoading(true);

        let team = new FormData()
        team.append('id', teamId)
        team.append('name', teamName)
        team.append('country_id', countryId)
        team.append('competitions', JSON.stringify(competitionsIds) )
        if(image){
            let filename = teamName + image.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            team.append('photo', { uri: image, name: filename, type });
        }

        let headers =  { header: { 'content-type': 'multipart/form-data' } };

        if(teamId){
            await api.post(`team/updateWithImage/${teamId}`, team, headers)
            .then(()  => navigation.navigate('Team', { refresh: new Date }) ) 
        } else {
            await api.post(`team`, team, headers)
            .then(() => navigation.navigate('Team', { refresh: new Date  }) )
        }
    }

    const deleteItem = async () => {
        setLoading(true);
        await api.delete(`team/${teamId}`).then(() => navigation.navigate('Team', { refresh: new Date  }))
    }

    return (
        <App style={{ justifyContent: 'space-between', alignItems: 'center' }} >
            <BreadCrumb
                itens={[{
                    label: 'Cadastros',
                    route: 'Registrations'
                }, {
                    label: 'Time',
                    route: 'Team'
                }, {
                    label: teamId ? 'Alterar' : 'Cadastrar',
                }]}
            />

            <Card style={{ height: '97%' }} transparent>
                <CardTitle 
                    title={teamId ? 'Alterar' : 'Cadastrar'}
                    icon={teamId ? 'edit' : 'plus'}
                />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <CardBody>
                        <Input
                            label="Nome"
                            value={teamName}
                            onChangeText={(text) => { 
                                setteamName(text);
                                setTeamNameInputError(false);
                            }}
                            error={teamNameInputError}
                            errorText="Campo obrigat??rio"
                            loading={loading}
                        />

                        <Select
                            icon={'globe'}
                            label="Pa??ses"
                            itens={countries}
                            indexValueInitial={countryId}
                            onItemPress={(index, value) => removeErrorAndSelectCountry(index)}
                            error={countrySelectError}
                            errorText="Selecione um pa??s"
                            loading={loading}
                        />

                        <List title={"Competi????es"} loading={loading}>
                            {competitions && competitions.map(item => (
                                <ListItem label={`${item.name} | ${item.season}`}>
                                    <Switch
                                        leftIcon={"times"}
                                        rightIcon={"check"}
                                        value={competitionsIds.filter(comp => comp === item.id).length > 0}
                                        onValueChange={() => activeCompetition(item.id)}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <ImageSelect 
                            image={image} 
                            onPress={() => {
                                pickImage();
                                setPhotoError(false);
                            }} 
                            error={photoError} 
                            errorText={"Selecione uma imagem."}
                        />
                    </CardBody>
                </ScrollView>

                <CardFooter style={{ justifyContent: 'space-between' }}>
                    <Button
                        label="Salvar"
                        color="rgba(0, 255, 0, 0.5)"
                        icon="save"
                        onPress={save}
                        style={{ width: teamId ? '69%' : '100%' }}
                        loading={loading}
                    />
                    {
                        teamId ? 
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
                        <Text style={{ fontSize: 15 }}> Excluir {teamName} ?</Text>
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