import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export const AppContext = createContext({});

function AppProvider({ children }){

    const [_authenticate, _setAuthenticate] = useState(false);
    const [_loading, _setLoading] = useState(false);
    const [_user, _setUser] = useState(null);

    const _register = async (email, name, password, password_confirmation) => {
        _setLoading(true);
        await api.post('register', { email, name, password, password_confirmation }).then((response) => {
            _login(email, password);
        })
    }

    const _login = async (email, password) => {
        _setLoading(true);
        await api.post('login', { email, password }).then((response) => {
            const { user, access_token } = response.data;
            _storageUser({ access_token, ...user });
            _setUser({ access_token, ...user });
            _setLoading(false);
        })
    }

    const _logOut = async () => {
        await AsyncStorage.clear().then(() => _setUser(null));
    }

    async function _storageUser(objectUser){
        AsyncStorage.setItem('authenticate_user', JSON.stringify(objectUser))
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
            _user,
            _loading,
            _setLoading,
            _register,
            _login,
            _logOut
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;