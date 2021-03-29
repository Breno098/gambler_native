import React, { Children } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Form({ children }) {

    return (
        <View>
            {
                Children.map(children, (child, i) => {

                })
            }
        </View>
    );
}