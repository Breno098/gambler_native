import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const AppContext = createContext({});

function AppProvider({ children }){

    const [_authenticate, _setAuthenticate] = useState(false);
    const [_loading, _setLoading] = useState(false);
    const [_user, _setUser] = useState(null);

    const _authenticateMethod = (email, password) => {
        
    }

    useEffect(() => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('authenticate_user');
            if(storageUser){
                _setLoading(true);
                _setUser(JSON.parse(storageUser));
            }
            _setLoading(false);
        }
        loadStorage();
    }, []);


    return(
        <AppContext.Provider value={{
            _authenticate,
            _loading,
            _setLoading
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;