import React, { useContext } from 'react';
import { Text } from '../../components/typography/text.component';
import { View, SafeAreaView, Image } from 'react-native';
import styled from 'styled-components/native';
import { Button, Colors } from 'react-native-paper';
import { AuthContext } from '../../services/auth/auth.context';

const SafeArea = styled(SafeAreaView)`
    flex:1;
    justify-content: space-between;
`;

const LogoView = styled(View)`
    flex:.6;
    justify-content:center;
    align-items:center;
  
`;
const LogoutView = styled(View)`
    flex:.2;
    justify-content:center;
    align-items:center;
`;

const LogOutButton = styled(Button)`
    justify-content:center;
    align-items:center;
    color: #000;
`;

const AppVersion = styled(Text)`
    font-size:13px;
    font-weight:normal;
    color: ${Colors.grey500};
`;



export const SettingsScreen = () => {

    const { onLogout } = useContext(AuthContext);
    return (
        <>
            <SafeArea>

                <LogoView>
                    <Image
                        style={{
                            width: 250,
                            height: 100,
                            resizeMode: "contain",
                            alignSelf: "center",
                        }}
                        source={require("../../../assets/logo2.png")} />
                    <AppVersion variant="hint">App Version: 1.0.0</AppVersion>
                </LogoView>


                {/* Add logout button to bottom */}
                <LogoutView>
                    <LogOutButton color={Colors.grey900} icon="logout" mode="outlined" onPress={onLogout}>
                        Logout
                    </LogOutButton>
                </LogoutView>


            </SafeArea>
        </>
    );
}
