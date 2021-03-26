import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Home from '../pages/App/Home';
import Country from '../pages/App/Country';
import FormCountry from '../pages/App/Country/form'

const AppStack = createStackNavigator();

export default function AppRoutes(){
    return(
        <AppStack.Navigator 
            headerMode="none"
            screenOptions={{
                gestureEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
            <AppStack.Screen 
                name="Home" 
                component={Home}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal-inverted"
                }}
            />
            <AppStack.Screen 
                name="Country" 
                component={Country}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal"
                }}
            />
            <AppStack.Screen 
                name="FormCountry" 
                component={FormCountry}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal"
                }}
            />
        </AppStack.Navigator>
    );
}