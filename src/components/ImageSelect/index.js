import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ImageSelect({ onPress, icon, loading, color, disabled, error, errorText, image, ...props }) {

    const [errorAnimated] = useState(new Animated.Value(0));
    const inputEl = useRef(null);

    useEffect(() => {
        if(error === true){
            Animated.timing(errorAnimated, {toValue: 30, duration: 350, useNativeDriver: true}).start()
            setTimeout(() => Animated.timing(errorAnimated, {toValue: 0, duration: 500, useNativeDriver: true}).start(), 400)
        }
    }, [error])

    return (
        <View>
            <View   
                style={{
                        borderColor: disabled ? '#eee' : error ? 'rgba(255, 0, 0, 1)' : color ? color : "#525252",
                        borderWidth : 1,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        width: '100%',
                        height: 300,
                    }}  
            >
                {
                    image ? 
                        <Image 
                            source={{ uri: image }} 
                            style={{ width: '100%', height: '100%', borderRadius: 9, }} 
                            resizeMode="contain"
                        />
                    :
                        <Image 
                            source={require('../../images/no-image.png')} 
                            style={{ width: '100%', height: '100%', borderRadius: 9, }} 
                            resizeMode="contain"
                        />
                    }
            <TouchableWithoutFeedback onPress={onPress}>
                <View
                    style={{ 
                        position: 'absolute',
                        marginLeft: 10,
                        marginTop: 20,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100
                    }}
                >
                    <Icon name="camera" size={20} color="#fff"/>    
                </View>
            </TouchableWithoutFeedback>
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