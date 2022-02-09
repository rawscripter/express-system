import React, { useState, useContext, useEffect } from 'react';
import { Text } from '../../components/typography/text.component';
import { StatusBar, View, SafeAreaView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { Spacer } from '../../components/spacer/spacer.component';

import { ActivityIndicator, Colors } from 'react-native-paper';

import { AuthContext } from '../../services/auth/auth.context';

const SafeArea = styled(SafeAreaView)`
    flex:.8;
    background-color: #fff;
`;
const LogoView = styled(View)`
    justify-content:center;
    margin-bottom:50px;
`;

const LoginView = styled(View)`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const InputView = styled(View)`
    height:50px;
    width:80%;
    margin-bottom:30px;
`;

export const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, isLoading, error } = useContext(AuthContext);

    const handleLogin = () => {

        onLogin({ email, password });
    }

    return (
        <>
            <SafeArea>
                <LoginView>
                    <LogoView>
                        <Image
                            style={{
                                width: 250,
                                height: 100,
                                resizeMode: "contain",
                                alignSelf: "center",
                                borderWidth: 1,
                                borderRadius: 20,
                                borderColor: '#fff',
                            }}
                            source={require("../../../assets/logo2.png")} />

                    </LogoView>
                    <InputView >
                        <TextInput
                            label="Email Address"
                            mode="outlined"
                            keyboardType='email-address'
                            autoCapitalize='none'
                            theme={{
                                colors: {
                                    primary: '#000',
                                    background: '#fff',
                                    text: '#000',
                                    placeholder: error ? '#f00' : '#000',
                                }
                            }}
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                        />
                    </InputView>
                    <Spacer size="small" />
                    <InputView  >
                        <TextInput
                            label="Password Address"
                            mode="outlined"
                            autoCapitalize='none'
                            theme={{
                                colors: {
                                    primary: '#000',
                                    background: '#fff',
                                    text: '#000',
                                    placeholder: error ? '#f00' : '#000',
                                }
                            }}
                            value={password}

                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </InputView>

                    <Spacer size="medium" />

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#000',
                            padding: 15,
                            borderRadius: 5,
                            width: '80%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={handleLogin}
                    >


                        {isLoading ?
                            <ActivityIndicator animating={true} color="#fff" />
                            : <Text style={{ color: '#fff' }}>Login</Text>
                        }

                    </TouchableOpacity>
                    <Spacer size="large" />
                    {error && <Text style={{ color: '#f00' }}>{error}</Text>}
                </LoginView>
            </SafeArea>
        </>
    );
}; 
