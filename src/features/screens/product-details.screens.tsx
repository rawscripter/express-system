import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Spacer } from '../../components/spacer/spacer.component';
import { SafeAreaView, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Text } from '../../components/typography/text.component';
import { useNavigation } from '@react-navigation/native'



const SafeContainer = styled(SafeAreaView)`
       flex:1;
   
`;
const ProductCard = styled(Card)`
    margin-left: 16px;
    margin-right: 16px;
  
    margin-bottom: 10px;
`;

const ProductContent = styled(Card)`
    padding: 16px;
`;

const Section = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ProductDetailsScreen = ({ product = {}, }) => {
    const navigation = useNavigation()

    const {
        name = 'C-Arm Philips BV-29',
        price = '8000 USD',
        image = 'https://www.express-systems.net/storage/systems/2FWZvjl8vJ6fgZ7GmyiwsBityB2FGQbyTZJnHpLF.jpg',
        inStock = true,
        menufacturer = 'Toshiba',
        model = 'Toshiba',
        dateOfManufacture = '01/01/1970',
        systemNumber = '123456789',
        modality = 'C-Arm',
    } = product;


    return (
        <>
            <SafeContainer >
                <Spacer size="large" />
                <ProductCard>
                    <Card.Cover source={{ uri: image }} />
                    <Spacer size="small" />
                    <ProductContent>
                        <Section>
                            <View>
                                <Text>{name}</Text>
                            </View>
                            {/* show price if its set */}
                            {price && <Text >{price}</Text>}
                        </Section>
                    </ProductContent>
                </ProductCard>
                <Spacer size="small" />
                <ProductCard>
                    <ProductContent>
                        <Section>
                            <Text>Availability</Text>
                            <Text>In Stock</Text>
                        </Section>
                    </ProductContent>
                    <ProductContent>
                        <Section>
                            <Text>Model</Text>
                            <Text>{model}</Text>
                        </Section>
                    </ProductContent>

                    <ProductContent>
                        <Section>
                            <Text>Serial Number</Text>
                            <Text>{systemNumber}</Text>
                        </Section>
                    </ProductContent>

                    <ProductContent>
                        <Section>
                            <Text>Modality</Text>
                            <Text>{modality}</Text>
                        </Section>
                    </ProductContent>

                    <ProductContent>
                        <Section>
                            <Text>Manufacturer</Text>
                            <Text>{menufacturer}</Text>
                        </Section>
                    </ProductContent>

                    <ProductContent>
                        <Section>
                            <Text>Date of menufactur</Text>
                            <Text>{dateOfManufacture}</Text>
                        </Section>
                    </ProductContent>

                </ProductCard>
            </SafeContainer>
        </>
    );
}
