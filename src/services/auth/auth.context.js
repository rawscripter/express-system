import React, { useState, createContext, useEffect } from 'react';
import { loginRequest } from '../auth/auth.service';
export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState('');
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState("");

    const onLogin = async (email, password) => {
        setIsLoading(true);
        setError(null);
        loginRequest(email, password)
            .then(response => {
                storeToken(response.data.token);
                setUser(response.data.user);
                setIsAuthenticated(true);
                // console.log(response.user);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    };

    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem(
                'token',
                token
            );
            setToken(token);
        } catch (e) {
            setError(e);
        }
    }


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            isLoading,
            error,
            onLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}