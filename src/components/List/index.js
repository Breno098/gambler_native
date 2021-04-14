import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Animated, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function List({ icon, loading, children, title, color, error, errorText, ...props }) {

    const [errorAnimated] = useState(new Animated.Value(0));

    useEffect(() => {
        if(error === true){
            Animated.timing(errorAnimated, {toValue: 30, duration: 350, useNativeDriver: true}).start()
            setTimeout(() => Animated.timing(errorAnimated, {toValue: 0, duration: 500, useNativeDriver: true}).start(), 400)
        }
    }, [error])

    return (
        <View>
            <View style={{ width: '100%', height: 150, paddingTop: 9, marginBottom: 23 }}>
                <View   
                    style={{
                            borderColor: error ? 'rgba(255, 0, 0, 1)' : color ? color : "#525252",
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth : 1,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            width: '100%',
                            height: 150,
                        }}  
                >
                    {
                        loading
                        ?
                        <ActivityIndicator size={15} color={"#525252"} style={{ marginLeft: 8, marginRight: 8 }}/>
                        :
                        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                            <View
                                style={{
                                    alignItems: 'center'
                                }}
                            >
                                { children }
                            </View>
                        </ScrollView>
                    }
                </View>
                {
                    title &&
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
                            {  title ?? '' }
                        </Text>
                }
                {
                    error &&
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
                }
            </View>
        </View>
    );
}