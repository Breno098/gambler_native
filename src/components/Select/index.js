import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Animated, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../Button';
import Card from '../Card';
import CardTitle from '../CardTitle';
import CardBody from '../CardBody';
import Dialog from '../Dialog';

export default function Select({ icon, loading, label, color, disabled, error, errorText, itens, onItemPress, indexValueInitial }) {

    const [errorAnimated] = useState(new Animated.Value(0));

    const [dialog, setDialog] = useState(false);
    const [labelSelected, setLabelSelected] = useState('');

    useEffect(() => {
        if(error === true){
            Animated.timing(errorAnimated, {toValue: 30, duration: 350, useNativeDriver: true}).start()
            setTimeout(() => Animated.timing(errorAnimated, {toValue: 0, duration: 500, useNativeDriver: true}).start(), 400)
        }
    }, [error])

    useEffect(() => {
        itens.map(item => {
            if(indexValueInitial == item.value){
                setLabelSelected(item.label);
            }
        })
    }, [itens])

    return (
        <TouchableWithoutFeedback onPress={loading ? () => {} : () => setDialog(true) }>
            <View style={{ width: '100%', height: 60, paddingTop: 9, marginBottom: 23 }} >
                <View   
                    style={{
                            borderColor: disabled ? '#eee' : error ? 'rgba(255, 0, 0, 1)' : color ? color : "#525252",
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderWidth : 1,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            width: '100%',
                            padding: 10,
                            height: 50,
                    }}  
                >
                    <Text>
                        { labelSelected ? labelSelected : 'Selecione' }
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}    
                    >
                        <Icon name={dialog ? 'caret-up' : 'caret-down'} size={15} color={"rgba(0, 0, 0, 0.5)"} style={{ marginLeft: 8, marginRight: 8 }}/>
                        {
                            error ? 
                                <Icon name='exclamation' size={15} color={"#525252"} style={{ marginLeft: 8, marginRight: 8 }}/> 
                            : icon && !loading ?
                                <Icon name={icon} size={15} color={"#525252"} style={{ marginLeft: 8, marginRight: 8 }}/>
                            : loading ?
                                <ActivityIndicator size={15} color={"#525252"} style={{ marginLeft: 8, marginRight: 8 }}/>
                            : null
                        }
                    </View>
                </View>
                {
                    label ?
                        <Text 
                            style={{ 
                                color: "#000", 
                                fontSize: 15,
                                position: 'absolute',
                                marginLeft: 10,
                                backgroundColor: '#fff',
                                paddingLeft: 10,
                                paddingRight: 10,
                            }}
                        >
                            {  label ?? '' }
                        </Text>
                    : null
                }
                {
                    error ?
                        <Animated.View style={{
                            width: '100%',
                            marginTop: 5,
                            marginLeft: 10,
                            transform: [{translateX: errorAnimated}]
                        }}>
                            <Text style={{ color: "rgba(255, 0, 0, 0.4)", fontSize: 12, fontWeight: 'bold' }}>
                                { errorText ?? '' }
                            </Text>
                        </Animated.View>
                    : null
                }

                <Dialog visible={dialog} onRequestClose={() => setDialog(false)}>
                    <Card style={{ width: '90%', height: 400, padding: 0 }}>
                        <CardTitle title={'Países'} icon={icon}/>

                        <CardBody>
                            <ScrollView>
                                <TouchableOpacity 
                                    onPress={() => { 
                                        onItemPress(null, null)
                                        setLabelSelected('Selecione')
                                        setDialog(false)
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 45,
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Icon name={'times'} size={25} color={"rgba(0, 0, 0, 0.5)"} style={{ marginRight: 15 }}/> 
                                    <Text  style={{ fontSize: 18 }}> Nenhum </Text>
                                </TouchableOpacity> 
                                {
                                    itens ? itens.map(item => ( 
                                        <TouchableOpacity 
                                            onPress={() => { 
                                                onItemPress(item.value.toString(), item.label)
                                                setLabelSelected(item.label)
                                                setDialog(false)
                                            }}

                                            style={{
                                                width: '100%',
                                                height: 45,
                                                justifyContent: 'center',
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {
                                                item.icon ? 
                                                    <Icon name={item.icon} size={25} color={"rgba(0, 0, 0, 0.5)"} style={{ marginRight: 15 }}/> 
                                                : null
                                            }
                                            <Text  style={{ fontSize: 18 }}> 
                                                { item.label ?? '' }  
                                            </Text>
                                        </TouchableOpacity> 
                                    )) : null
                                }
                            </ScrollView>
                        </CardBody>
                    </Card>
                </Dialog>
            </View>
        </TouchableWithoutFeedback>
    );
}