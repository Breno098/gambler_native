import React, { useContext } from 'react';
import { View, ActivityIndicator} from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { AppContext } from '../providers/app'

export default function Routes(){
    const { _user, _loading } = useContext(AppContext);

    if(_loading){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color="#00f018"/>
            </View>
        )
    }

    return !_user ? <AppRoutes/> : <AuthRoutes/>;
}