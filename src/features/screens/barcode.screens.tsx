import React, { useState, useEffect, useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from "react-native";
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Spacer } from '../../components/spacer/spacer.component';


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
const LoadingView = styled(View)`
            flex:1; 
            justify-content:center;
            align-items:center;
`;


export const BarcodeScreen = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);


    const searchBarcodeQuery = () => {
        navigation.navigate('ProductDetails', { barcode: searchQuery });
    }

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);




    const handleBarCodeScanned = ({ type, data }) => {
        setOpenCamera(false);
        navigation.navigate('ProductDetails', { barcode: data });
    };

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
