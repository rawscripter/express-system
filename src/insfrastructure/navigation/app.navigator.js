import { HomeScreen } from '../../features/screens/home.screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BarcodeNavigator } from './barcode.navigator';
import { LoginScreen } from '../../features/screens/login.screens';

const Tab = createBottomTabNavigator();
const TAB_ICON = {
    Home: 'md-home',
    Barcode: 'md-camera',
}

const screenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];
    return {
        tabBarIcon: ({ color, size }) => {
            return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
    };
}

export const AppNavigator = () => {
    return (
        <NavigationContainer >
            <Tab.Navigator screenOptions={screenOptions}>

                <Tab.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Home"
                    component={HomeScreen}
                />
                <Tab.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Barcode"
                    component={BarcodeNavigator}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}