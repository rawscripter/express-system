import React, { useState, createContext } from 'react';
import { loginRequest } from './auth.service';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);



    const onLogin = (email, password) => {
        setIsLoading(true);
        setError(null);
        loginRequest(email, password)
            .then(response => {
                setIsAuthenticated(true);
                setUser(response.user);
                setToken(response.token);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    };


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