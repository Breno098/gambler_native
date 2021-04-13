import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, ScrollView, TouchableOpacity} from 'react-native';

import App from '../../../components/App';
import ScrollMenu from '../../../components/ScrollMenu';
import ScrollMenuItem from '../../../components/ScrollMenuItem';
import Card from '../../../components/Card';
import CardBody from '../../../components/CardBody';
import CardFooter from '../../../components/CardFooter'

export default function Registrations() {

  const navigation = useNavigation();

  return (
      <App style={{ 
        justifyContent: 'flex-end'
       }}>
        {/* <Card>

        </Card> */}

        <ScrollMenu>
          <ScrollMenuItem 
            icon="futbol-o"
            label="Jogos"
          />
          <ScrollMenuItem 
            icon="globe" 
            onPress={() => navigation.navigate('Country', { refresh: new Date })}
            label="País"
          />
          <ScrollMenuItem 
            icon="user"
            label="Jogador"
            onPress={() => navigation.navigate('Player', { refresh: new Date })}
          />
          <ScrollMenuItem 
            icon="users"
            label="Time"
            onPress={() => navigation.navigate('Team', { refresh: new Date })}
          />
          <ScrollMenuItem 
            icon="flag"
            label="Estádio"
            onPress={() => navigation.navigate('Stadium', { refresh: new Date })}
          />
        </ScrollMenu>
      </App>
  );
}