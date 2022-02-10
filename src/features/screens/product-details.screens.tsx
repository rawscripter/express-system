import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Spacer } from '../../components/spacer/spacer.component';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Text } from '../../components/typography/text.component';
import { useNavigation, useNavigationParam } from '@react-navigation/native'
import { ProductContext } from '../../services/products/product.context';
import { ActivityIndicator, Colors } from 'react-native-paper';


const SafeContainer = styled(SafeAreaView)`
       flex:1;
   
`;
const ProductCard = styled(Card)`
    margin-left: 16px;
    margin-right: 16px;
    margin-bottom: 10px;
 `;

const ProductContent = styled(Card)`
    padding: 12px; 
    border-radius: 0px;
 `;


const Section = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const LoadingView = styled(View)`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const ScrollViewContainer = styled(ScrollView)`
    flex:1;
     marginHorizontal: 0px; 
`;

export const ProductDetailsScreen = ({ route }) => {

    const navigation = useNavigation()
    const { barcode } = route.params;
    const { product, onSearch, isLoading, resetProduct, error } = useContext(ProductContext);

    useEffect(() => {
        resetProduct();
        onSearch(barcode);
    }, [])

    const {
        name,
        price,
        image,
        inStock,
        menufacturer,
        model,
        dateOfManufacture,
        systemNumber,
        modality,
    } = product;

    if (isLoading) {
        return (
            <LoadingView>
                <ActivityIndicator size="large" animating={true} color={Colors.orange800} />
            </LoadingView>
        );
    }

    if (error) {
        return (
            <LoadingView>
                <Text varient="body">{error}</Text>
            </LoadingView>
        );
    }

    return (
        <>
            <SafeContainer >
                <ScrollViewContainer >
                    <Spacer size="large" />
                    <ProductCard>
                        <Card.Cover source={{ uri: image }} />
                        <Spacer size="small" />
                        <ProductContent>
                            <Section>
                                <View>
                                    <Text variant="caption">{name}</Text>
                                </View>
                                {/* show price if its set */}
                                {price && <Text variant="label" >{price}</Text>}
                            </Section>
                        </ProductContent>
                    </ProductCard>
                    <Spacer size="small" />
                    <ProductCard>
                        <ProductContent>
                            <Section>
                                <Text variant="caption">Availability</Text>
                                <Text variant="caption">{inStock ? 'In Stock' : 'Sold'}</Text>
                            </Section>
                        </ProductContent>
                        <ProductContent>
                            <Section>
                                <Text variant="caption">Model</Text>
                                <Text variant="caption">{model || '-'}</Text>
                            </Section>
                        </ProductContent>

                        <ProductContent>
                            <Section>
                                <Text variant="caption">Serial Number</Text>
                                <Text variant="caption">{systemNumber || '-'}</Text>
                            </Section>
                        </ProductContent>

                        <ProductContent>
                            <Section>
                                <Text variant="caption">Modality</Text>
                                <Text variant="caption">{modality || '-'}</Text>
                            </Section>
                        </ProductContent>

                        <ProductContent>
                            <Section>
                                <Text variant="caption">Manufacturer</Text>
                                <Text variant="caption">{menufacturer || '-'}</Text>
                            </Section>
                        </ProductContent>
                        <ProductContent>
                            <Section>
                                <Text variant="caption">Date of menufactur</Text>
                                <Text variant="caption">{dateOfManufacture || '-'}</Text>
                            </Section>
                        </ProductContent>
                    </ProductCard>
                </ScrollViewContainer>
            </SafeContainer>
        </>
    );
}
