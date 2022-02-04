import React, { useState, createContext } from 'react';
import { loginRequest } from '../auth/auth.service';

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

                setToken(response.data.token);
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