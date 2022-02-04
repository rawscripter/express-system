import React from 'react';
import { BarcodeScreen } from '../../features/screens/barcode.screens';
import { ProductDetailsScreen } from '../../features/screens/product-details.screens';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';


const ProductsStack = createStackNavigator();

export const BarcodeNavigator = () => {
    return (
        <ProductsStack.Navigator

            screenOptions={{
                ...TransitionPresets.ModalPresentationIOS,
            }}>
            <ProductsStack.Screen
                options={{
                    headerTitle: 'Scan Barcode',
                }}
                name="BarcodeScan"
                component={BarcodeScreen}
            />

            <ProductsStack.Screen
                options={{
                    headerTitle: '',
                    headerBackTitleStyle: {
                        color: '#000',
                    },
                    headerTintColor: '#000',
                }}

                name="ProductDetails"
                component={ProductDetailsScreen}
            />
        </ProductsStack.Navigator>
    )
}