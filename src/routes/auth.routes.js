import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';


import Init from '../pages/Init';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

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
            component={Init}
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
        {/* <AuthStack.Screen 
        name="SignUp" 
        component={SignUp}
        options={{ 
            headerStyle: {
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderBottomWidth: 5,
                borderBottomColor: "#09ad00"
            },
            headerTintColor: "#000",
            headerBackTitleVisible: false,
            headerTitle: 'Voltar'
        }}
        /> */}
    </AuthStack.Navigator>
    );
}

export default AuthRoutes;
