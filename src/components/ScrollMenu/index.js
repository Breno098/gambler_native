import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ScrollMenu({ children }) {
    return (
        <View style={{ 
            width: '100%', 
            height: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ScrollView 
              style={{ width: '100%' }} 
              horizontal 
              contentContainerStyle={{  paddingHorizontal: 5 }} 
              showsHorizontalScrollIndicator={false}
            >
              { children }
            </ScrollView>
  
        </View>
    );
}