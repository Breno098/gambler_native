import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { AppContext } from '../../providers/app';

export default function App({ children, style }) {

    const { _colors } = useContext(AppContext);

    return (
        <SafeAreaView 
            style={{
                flex: 1,
                backgroundColor: _colors._theme,
                width: '100%',
                paddingTop: 50,
                paddingBottom: 10,
                position: 'relative',
                ...style
            }}
        >
            { children }
        </SafeAreaView>
    );
}