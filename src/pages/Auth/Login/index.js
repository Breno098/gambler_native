import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { AppContext } from '../../../providers/app'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import App from '../../../components/App';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

export default function Login() {

  const navigation = useNavigation();

  const { _login } = useContext(AppContext);

  const [email, setEmail] = useState('breno@email.com');
  const [password, setPassword] = useState('senha123');
  const [openEye, setOpenEye] = useState(true);

  const handleOpenEye = () => setOpenEye(!openEye);

  return (
      <App style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image style={styles.logo} source={require('../../../images/Logo.png')}/>

        <Input
            label={"Email"}
            value={email}
            onChangeText={(text) => setEmail(text) }
            style={{ width: '95%' }}
        />

        <Input
            label={"Senha"}
            value={password}
            onChangeText={(text) => setPassword(text) }
            style={{ width: '95%' }}
        />

        <Button
          style={{ marginBottom: 23, width: '95%' }}
          label="Registrar"
          mode={"text"}
          onPress={() => navigation.navigate('SignUp')}
        />
{/* 
        <View style={styles.inputArea}>
          <Text style={styles.label}>
            Email
          </Text>
          <TextInput 
            style={styles.input}  
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}/>
        </View>
        
        <View style={styles.inputPassArea}>
          <Text style={styles.labelPass}>
            Senha
          </Text>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput 
              style={styles.inputPass} 
              secureTextEntry={openEye}
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Icon
              onPress={ handleOpenEye }
              name={ openEye ? 'eye' : 'eye-slash' }
              size={30}
              color="#00f018"
              style={{ marginBottom: 15, marginLeft: 10}}
            />
          </View>
        </View> */}

        <Button
          label="Login"
          color="rgba(0, 255, 0, 0.5)"
          style={{ width: '95%' }}
          onPress={() => _login(email, password)}
        />
      </App>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '100%'
  },

  logo: {
    height: 130,
    width: 130
  },

  inputArea: {
    width: '85%',
    marginTop: 25
  },

  label: {
    fontSize: 25,
    color: '#00f018',
    width: '100%',
  },

  input: {
    fontSize: 20,
    color: '#00f018',
    borderBottomColor: '#00f018',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 15
  },

  inputPassArea: {
    width: '85%',
    marginTop: 30,
  },

  labelPass: {
    fontSize: 25,
    color: '#00f018',
    width: '100%',
  },

  inputPass: {
    fontSize: 20,
    color: '#00f018',
    borderBottomColor: '#00f018',
    borderBottomWidth: 1,
    // width: '100%',
    flex: 80,
    paddingLeft: 15
  },

  loginButton: {
    backgroundColor: '#00f018',
    borderWidth: 1,
    height: 60,
    width: '85%',
    borderRadius: 25,
    justifyContent: 'center',
    marginTop: 100
  },

  loginButtonText: {
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
  }, 
});
