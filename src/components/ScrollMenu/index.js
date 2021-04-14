import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ScrollMenu({ children }) {
    return (
        <View style={{ 
            width: '100%', 
            height: 100, 
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5
        }}>
            <ScrollView 
              style={{ width: '100%', marginRight: 15 }} 
              horizontal 
              showsHorizontalScrollIndicator={false}
            >
              { children }
            </ScrollView>
  
        </View>
    );
}