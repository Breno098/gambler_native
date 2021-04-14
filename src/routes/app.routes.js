import React from 'react';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Registrations from '../pages/App/Registrations';

import Country from '../pages/App/Country';
import FilterCountry from '../pages/App/Country/filter';
import FormCountry from '../pages/App/Country/form';

import Player from '../pages/App/Player';
import FilterPlayer from '../pages/App/Player/filter';
import FormPlayer from '../pages/App/Player/form';

import Stadium from '../pages/App/Stadium';
import FilterStadium from '../pages/App/Stadium/filter';
import FormStadium from '../pages/App/Stadium/form';

import Team from '../pages/App/Team';
import FilterTeam from '../pages/App/Team/filter';
import FormTeam from '../pages/App/Team/form';

import Competition from '../pages/App/Competition';
import FilterCompetition from '../pages/App/Competition/filter';
import FormCompetition from '../pages/App/Competition/form';

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

            <Stack.Screen name="Country" component={Country} options={{ title: '' }}/>
            <Stack.Screen name="FilterCountry" component={FilterCountry} options={{ title: "" }}/>
            <Stack.Screen name="FormCountry" component={FormCountry} options={{ title: "" }}/>

            <Stack.Screen name="Player" component={Player} options={{ title: '' }}/>
            <Stack.Screen name="FilterPlayer" component={FilterPlayer} options={{ title: "" }}/>
            <Stack.Screen name="FormPlayer" component={FormPlayer} options={{ title: "" }}/>

            <Stack.Screen name="Stadium" component={Stadium} options={{ title: '' }}/>
            <Stack.Screen name="FilterStadium" component={FilterStadium} options={{ title: "" }}/>
            <Stack.Screen name="FormStadium" component={FormStadium} options={{ title: "" }}/>

            <Stack.Screen name="Team" component={Team} options={{ title: '' }}/>
            <Stack.Screen name="FilterTeam" component={FilterTeam} options={{ title: "" }}/>
            <Stack.Screen name="FormTeam" component={FormTeam} options={{ title: "" }}/>

            <Stack.Screen name="Competition" component={Competition} options={{ title: '' }}/>
            <Stack.Screen name="FilterCompetition" component={FilterCompetition} options={{ title: "" }}/>
            <Stack.Screen name="FormCompetition" component={FormCompetition} options={{ title: "" }}/>
        </Stack.Navigator>
    );
}