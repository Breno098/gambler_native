import React from 'react';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Registrations from '../pages/App/Registrations';

import Country from '../pages/App/Country';
import FilterCountry from '../pages/App/Country/filter';
import FormCountry from '../pages/App/Country/form'

import Player from '../pages/App/Player';
import FilterPlayer from '../pages/App/Player/filter';
import FormPlayer from '../pages/App/Player/form'

const Stack = createStackNavigator();

export default function AppRoutes(){
    return(
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyle: {
                    backgroundColor: 'rgb(247, 106, 5)',
                },
                headerTintColor: '#fff',
                gestureDirection: "horizontal",
            }}
        >
            <Stack.Screen 
                name="Registrations" 
                component={Registrations}
                options={{
                    // headerTitle: props => ( 
                    //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    //         <Icon name="home" size={20} color="#fff"/>
                    //         <Text> Gamblers </Text>
                    //     </View>
                    // )
                }}
            />

            <Stack.Screen name="Country" component={Country} options={{ title: 'Países' }}/>
            <Stack.Screen name="FilterCountry" component={FilterCountry} options={{ title: "" }}/>
            <Stack.Screen name="FormCountry" component={FormCountry} options={{ itle: "" }}/>

            <Stack.Screen name="Player" component={Player} options={{ title: 'Jogadores' }}/>
            <Stack.Screen name="FilterPlayer" component={FilterPlayer} options={{ title: "" }}/>
            <Stack.Screen name="FormPlayer" component={FormPlayer} options={{ itle: "" }}/>
        </Stack.Navigator>
    );
}