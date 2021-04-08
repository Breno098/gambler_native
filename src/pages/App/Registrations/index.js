import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, ScrollView, TouchableOpacity} from 'react-native';

import App from '../../../components/App';
import ScrollMenu from '../../../components/ScrollMenu';
import ScrollMenuItem from '../../../components/ScrollMenuItem';

export default function Registrations() {

  const navigation = useNavigation();

  return (
      <App style={{ }}>
        <ScrollMenu>
          <ScrollMenuItem 
            icon="edit" 
            onPress={() => navigation.navigate('Country', { 
              refresh: new Date 
            })}
          />
          <ScrollMenuItem icon="star"/>
          <ScrollMenuItem icon="users"/>
        </ScrollMenu>
      </App>
  );
}