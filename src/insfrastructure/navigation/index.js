import React, { useContext } from 'react';
import { AppNavigator } from './app.navigator';
import { AuthContext } from '../../services/auth.context';
import { LoginScreen } from '../../features/screens/login.screens';

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? <AppNavigator /> : <LoginScreen />;
}