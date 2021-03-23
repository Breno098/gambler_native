import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Home from '../pages/Auth/Home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';

const AuthStack = createStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator 
            headerMode="none"
            screenOptions={{
                gestureEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
            <AuthStack.Screen 
                name="Init" 
                component={Home}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal-inverted"
                }}
            />
            <AuthStack.Screen 
                name="Login" 
                component={Login}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal-inverted"
                }}
                
            />
            <AuthStack.Screen 
                name="SignUp" 
                component={SignUp}
                options={{ 
                    headerShown: false,
                    gestureDirection: "horizontal"
                }}
                
            />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;
