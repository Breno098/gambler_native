import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Home from '../pages/App/Home';

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
                name="Init" 
                component={Home}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal-inverted"
                }}
            />
        </AppStack.Navigator>
    );
}