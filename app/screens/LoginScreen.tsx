import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { decode, encode } from 'base-64';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/taskSlice';
import { SECRET_TOKEN } from '@env';
const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
  
const LoginScreen = () => {
  const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router:any = useRouter()
  
    const handleLogin = async () => {
      try {
        await loginSchema.validate({ email, password });
        const token = encode(SECRET_TOKEN);
  const userDetails= email
        const decodedToken = decode(token);
        if (decodedToken === SECRET_TOKEN) {
          dispatch(setUser({ token, userDetails }));
          await SecureStore.setItemAsync('userToken', token);
          router.push('(tab)');
        } else {
          setErrorMessage('Invalid credentials');
        }
      } catch (error:any) {
        setErrorMessage(error.message);
      }
    };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
      },
      errorText: {
        color: 'red',
        marginTop: 10,
      },
})