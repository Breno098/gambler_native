import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignUp() {
  const navigation = useNavigation();

  const [openEye, setOpenEye] = useState(true);

  const handleOpenEye = () => setOpenEye(!openEye);

  return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../images/Logo-orange.png')}/>

        <View style={styles.inputArea}>
          <Text style={styles.label}>
            Email
          </Text>
          <TextInput style={styles.input}/>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.label}>
            Nome
          </Text>
          <TextInput style={styles.input}/>
        </View>
        
        <View style={styles.inputPassArea}>
          <Text style={styles.labelPass}>
            Senha
          </Text>
          <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={styles.inputPass} secureTextEntry={openEye}/>
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
          <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={styles.inputPass} secureTextEntry={openEye}/>
            <Icon
              onPress={ handleOpenEye }
              name={ openEye ? 'eye' : 'eye-slash' }
              size={30}
              color="#ff636b"
              style={{ marginBottom: 15, marginLeft: 5 }}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.singUpButton}>
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
    marginTop: 25
  },

  label: {
    fontSize: 20,
    color: '#ff636b',
    width: '100%',
  },

  input: {
    fontSize: 20,
    color: '#ff636b',
    borderBottomColor: '#ff636b',
    borderBottomWidth: 1,
    width: '100%',
  },

  inputPassArea: {
    width: '85%',
    marginTop: 30
  },

  labelPass: {
    fontSize: 20,
    color: '#ff636b',
    width: '100%',
  },

  inputPass: {
    fontSize: 20,
    color: '#ff636b',
    borderBottomColor: '#ff636b',
    borderBottomWidth: 1,
    width: '100%',
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
