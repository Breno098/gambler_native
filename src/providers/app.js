import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export const AppContext = createContext({});

export default function AppProvider({ children }){

    /* --------------------------------------------------------- AUTH --------------------------------------------------------- */
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

    const _storageUser = async (objectUser) => {
        await AsyncStorage.setItem('authenticate_user', JSON.stringify(objectUser))
    }

    const _loadStorage = async () => {
        const storageUser = await AsyncStorage.getItem('authenticate_user');
        if(storageUser){
            _setLoading(true);
            _setUser(JSON.parse(storageUser));
        }
        _setLoading(false);
    }

    useEffect(() => {
        _loadStorage();
    }, []);
    /* ------------------------------------------------------- END AUTH ------------------------------------------------------- */

    const _exporter = {
        _user,
        _loading,
        _setLoading,
        _register,
        _login,
        _logOut,
    };

    return <AppContext.Provider value={_exporter}>{children}</AppContext.Provider>;
}