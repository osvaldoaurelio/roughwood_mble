import React, { useState, useEffect } from 'react';
import { Text, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '../../contexts/auth';
import logo from '../../img/logo.png';

import {
  Container,
  Form,
  Title,
  Image,
  FormFooter,
  Input,
  ErrorContainer,
  ErrorText,
  Button,
  BtnText,
  ActionContainer,
} from './styles';

export default function () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLogo, setShowLogo] = useState(true);
  const [errorInput, setErrorInput] = useState(false);

  const { signIn, error } = useAuth();

  const _keyboardDidShow = () => setShowLogo(false);

  const _keyboardDidHide = () => setShowLogo(true);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const handleSignIn = () => {
    if (username.includes(' ')) {
      return setErrorInput('Não é permitido espaços no Username');
    }
    if (!username || !password) {
      return setErrorInput('Preenchimento obrigatório');
    }

    signIn({ username, password });
  };

  return (
    <Container>
      <StatusBar style="#E9EDC9" />
      {showLogo && <Image source={logo}/>}
      <Title>Móveis planejados</Title>
      <Form onSubmit={handleSignIn}>
        {(error || errorInput) && (
          <ErrorContainer>
            <ErrorText>{error || errorInput}</ErrorText>
          </ErrorContainer>
        )}
        <Input
          autoFocus={true}
          name="username"
          placeholder="Username"
          autoCorrect={false}
          value={username}
          error={error || errorInput}
          onChangeText={text => setUsername(text)}
        />
        <Input
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          autoCorrect={false}
          value={password}
          error={error || errorInput}
          onChangeText={text => setPassword(text)}
        />
        <Button onPress={handleSignIn}>
          <BtnText>Entrar</BtnText>
        </Button>
        <ActionContainer>
          <Text>Esqueceu sua senha?</Text>
          <Text>Entre em contato com o adminastrô</Text>
        </ActionContainer>
      </Form>
      <FormFooter>
        <Text>Funcionário Login</Text>
      </FormFooter>
    </Container>
  );
}
