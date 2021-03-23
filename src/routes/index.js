import React, { useContext } from 'react';
import { View, ActivityIndicator} from 'react-native';

import AuthRoutes from './auth.routes';

import { AppContext } from '../providers/app'

function Routes(){

    const { _authenticate, _loading } = useContext(AppContext);

    if(_loading){
        return(
            <View style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignContent: 'center',
                backgroundColor: '#000',
            }}>
                <ActivityIndicator size="large" color="#ff636b"/>
            </View>
        )
    }

    return(
        _authenticate ? null : <AuthRoutes/>
    )
}

export default Routes;