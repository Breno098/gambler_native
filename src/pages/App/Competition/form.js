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
import ImageSelect from '../../../components/ImageSelect';

export default function Form({ route }) {
    
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [competitionNameInputError, setCompetitionNameInputError] = useState(false);
    const [seasonInputError, setSeasonInputError] = useState(false);
    const [photoError, setPhotoError] = useState(false);

    const [competitionId] = useState(route?.params ? route?.params.competition.id : null);
    const [competitionName, setcompetitionName] = useState(route?.params ? route?.params.competition.name : '');

    const [season, setSeason] = useState(route?.params ? route?.params.competition.season : '');

    const [dialog, setDialog] = useState(false);

    const [image, setImage] = useState(route?.params ? 'http://btpkq8ic.srv-45-34-12-242.webserverhost.top/storage/competitions/' + route?.params.competition.name_photo : null);

    useEffect(() => {
        permissionImage()
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
                alert('Necessário permissão para upload de imagem!');
            }
        }
    }

    const save = async () => {
        setCompetitionNameInputError(!competitionName);
        setSeasonInputError(!season);
        setPhotoError(!image)

        if(!competitionName || !season || !image){
            return;
        }

        Keyboard.dismiss();
        setLoading(true);

        let competition = new FormData()
        competition.append('name', competitionName)
        competition.append('season', season)
        if(image){
            let filename = competitionName + image.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            competition.append('photo', { uri: image, name: filename, type });
        }

        let headers =  { header: { 'content-type': 'multipart/form-data' } };

        if(competitionId){
            await api.post(`competition/updateWithImage/${competitionId}`, competition, headers)
            .then(()  => navigation.navigate('Competition', { refresh: new Date }) ) 
        } else {
            await api.post(`competition`, competition, headers)
            .then(() => navigation.navigate('Competition', { refresh: new Date  }) )
        }
    }

    const deleteItem = async () => {
        setLoading(true);
        await api.delete(`competition/${competitionId}`).then(() => navigation.navigate('Competition', { refresh: new Date  }))
    }

    return (
        <App style={{ justifyContent: 'space-between', alignItems: 'center' }} >
            <BreadCrumb
                itens={[{
                    label: 'Cadastros',
                    route: 'Registrations'
                }, {
                    label: 'Competições',
                    route: 'Competition'
                }, {
                    label: competitionId ? 'Alterar' : 'Cadastrar',
                }]}
            />

            <Card style={{ height: '97%' }} transparent>
                <CardTitle 
                    title={competitionId ? 'Alterar' : 'Cadastrar'}
                    icon={competitionId ? 'edit' : 'plus'}
                />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <CardBody>
                        <Input
                            label="Nome"
                            value={competitionName}
                            onChangeText={(text) => { 
                                setcompetitionName(text);
                                setCompetitionNameInputError(false);
                            }}
                            error={competitionNameInputError}
                            errorText="Campo obrigatório"
                            loading={loading}
                        />

                        <Input
                            label="Temporada"
                            value={season}
                            onChangeText={(text) => { 
                                setSeason(text);
                                setSeasonInputError(false);
                            }}
                            error={seasonInputError}
                            errorText="Campo obrigatório"
                            loading={loading}
                        />

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
                        style={{ width: competitionId ? '69%' : '100%' }}
                        loading={loading}
                    />
                    {
                        competitionId ? 
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
                        <Text style={{ fontSize: 15 }}> Excluir {competitionName} | {season} ?</Text>
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