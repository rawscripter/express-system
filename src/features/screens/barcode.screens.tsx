import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from "react-native";
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Spacer } from '../../components/spacer/spacer.component';
import { ProductContext } from '../../services/products/product.context';
import { ActivityIndicator, Colors } from 'react-native-paper';


const SafeContainer = styled(SafeAreaView)`
       flex:1;
`;

const SearchView = styled(View)`
           padding: 16px
`;
const ButtonView = styled(View)`
            flex:1;
            justify-content:center;
            align-items:center;
`;
//rounded sign in button
const CameraOpenButton = styled(Button)`
            padding: 5px;
            justify-content:center;
            align-items:center;
            font-size:23px;
            background-color: #fff;
`;
// 
const CameraView = styled(View)`
            flex:1;
            justify-content:center;
            align-items:center;
            border-radius:10px;

`;

const RoundedBox = styled(View)`
            width:300px;
            height:300px;
            border-radius:10px;
            background-color: #fff;
            justify-content:center;
            align-items:center;
            border-radius:10px;
`;


export const BarcodeScreen = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);
    const { isLoading, onSearch, error } = useContext(ProductContext);

    const searchBarcodeQuery = () => {
        // console.log(onSearch);
        onSearch(searchQuery);
    }

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if (error) {
            alert(error)
        }
    }, [error])


    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const handleBarCodeScanned = ({ type, data }) => {
        setOpenCamera(false);
        navigation.navigate('ProductDetails');
    };

    // if (hasPermission === null) {
    //     return <Text>Requesting for camera permission</Text>;
    // }
    // if (hasPermission === false) {
    //     return <Text>No access to camera</Text>;
    // }

    if (isLoading) {
        return (
            <ButtonView>
                <ActivityIndicator size="large" animating={true} color="tomato" />
            </ButtonView>

        );
    }




    return (
        <>
            <SafeContainer >
                <SearchView>
                    <Searchbar
                        onSubmitEditing={searchBarcodeQuery}

                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        placeholder="Search by barcode number"
                    />
                </SearchView>
                {

                    !openCamera &&
                    <ButtonView>
                        <CameraOpenButton color="#000"
                            icon="camera" mode="text"
                            onPress={() => setOpenCamera(true)}
                        >
                            SCAN BARCODE
                        </CameraOpenButton>
                    </ButtonView>
                }

                {
                    openCamera &&
                    <CameraView>
                        <RoundedBox>
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={StyleSheet.absoluteFillObject}
                            />

                        </RoundedBox>
                        <Spacer position="top" size="large" />
                        <CameraOpenButton color="#000"
                            mode="text"
                            onPress={() => setOpenCamera(false)}
                        >
                            Close Camera
                        </CameraOpenButton>
                    </CameraView>
                }
            </SafeContainer>
        </>
    );
}
