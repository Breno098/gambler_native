import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { AppContext } from '../../../providers/app'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignUp() {
  const { _register } = useContext(AppContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [openEye, setOpenEye] = useState(true);

  const handleOpenEye = () => setOpenEye(!openEye);

  return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../../images/Logo-orange.png')}/>

        <View style={styles.inputArea}>
          <Text style={styles.label}>
            Email
          </Text>
          <TextInput 
            style={styles.input}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.label}>
            Nome
          </Text>
          <TextInput 
            style={styles.input}
            autoCapitalize="none"
            value={name}
            onChangeText={(text) => setName(text)}
          />
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
              color="#ff636b"
              style={{ marginBottom: 15, marginLeft: 5 }}
            />
          </View>
        </View>

        <View style={styles.inputPassArea}>
          <Text style={styles.labelPass}>
            Confirmação de senha
          </Text>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput 
              style={styles.inputPass} 
              secureTextEntry={openEye}
              autoCorrect={false}
              autoCapitalize="none"
              value={passwordConfirm}
              onChangeText={(text) => setPasswordConfirm(text)}
            />
            <Icon
              onPress={ handleOpenEye }
              name={ openEye ? 'eye' : 'eye-slash' }
              size={30}
              color="#ff636b"
              style={{ marginBottom: 15, marginLeft: 5 }}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.singUpButton} onPress={() => _register(email, name, password, passwordConfirm)}>
          <Text style={styles.singUpButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 35
  },

  label: {
    fontSize: 25,
    color: '#ff636b',
    width: '100%',
  },

  input: {
    fontSize: 20,
    color: '#ff636b',
    borderBottomColor: '#ff636b',
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
    color: '#ff636b',
    width: '100%',
  },

  inputPass: {
    fontSize: 20,
    color: '#ff636b',
    borderBottomColor: '#ff636b',
    borderBottomWidth: 1,
    flex: 80,
    paddingLeft: 15
  },

  singUpButton: {
    backgroundColor: '#ff636b',
    borderWidth: 1,
    height: 60,
    width: '85%',
    borderRadius: 25,
    justifyContent: 'center',
    marginTop: 100
  },

  singUpButtonText: {
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
  }, 
});
