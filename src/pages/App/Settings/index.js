import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Container, Image, TouchableOpacity } from 'react-native';
import { AppContext } from '../../../providers/app';

import App from '../../../components/App';
import Button from '../../../components/Button';

export default function Settings() {
  const { _colors, _setColors } = useContext(AppContext);

  return (
      <App style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '90%', height: '100%'}} >
            <Button color='white' label="Color" icon="edit" width='50%' type="sm-rounded" onPress={() => {
                _setColors({
                    _theme: _colors._theme === 'rgba(0, 0, 0, 0.8)' ? '#fff' : 'rgba(0, 0, 0, 0.8)',
                    _main: _colors._main,
                    _secondary: _colors._secondary
                })
            }}/>
          </View>
      </App>
  );
}