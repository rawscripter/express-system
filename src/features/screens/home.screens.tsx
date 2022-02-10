import React, { useState, useEffect, useContext } from 'react';
import { StatusBar, View, SafeAreaView, TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import { Text } from '../../components/typography/text.component';
import { Button, Colors } from 'react-native-paper';
import { Alert } from 'react-native';
import { Spacer } from '../../components/spacer/spacer.component';
import { qoutes } from '../quotes/quotes';
import { AuthContext } from '../../services/auth/auth.context';
import { ClockInOutContext } from '../../services/clock/clock.context';
import { ActivityIndicator } from 'react-native-paper';
import Moment from 'moment';



const SafeContainer = styled(SafeAreaView)`
       flex:1;
`;

const SignInView = styled(View)`
            flex:1;
            justify-content:center;
            align-items:center;
`;
//rounded sign in button
const SignInButton = styled(Button)`
            width:150px;
            height:150px;
            border-radius:100px;
            justify-content:center;
            align-items:center;
            color: #000;
            background-color: #fff;
`;

const GreetingView = styled(View)`
            flex:.6;
            justify-content:center;
            align-items:center;
            padding: 22px;
            text-align:center;
    `
const GreetingTitle = styled(Text)`
            font-size:27px;
            font-weight:bold;
            color: #000;
`

const QuoteView = styled(View)`
            max-width:300px;
            text-align:center;
            `
const QuoteText = styled(Text)`
            font-size:15px;
            font-weight:bold;
            color: #000;
            text-align:center;
`

const OfficeTimingView = styled(View)`
            flex:.2;
            justify-content:center;
            align-items:center;
            text-align:center;
    `
const LoadingView = styled(View)`
            flex:1;
            justify-content:center;
            align-items:center;
            text-align:center;
    `
const ClockInOutSuccessText = styled(Text)`
            font-size:16px;
            font-weight:bold;
            color: ${Colors.grey500};
            text-align:center;
`

export const HomeScreen = () => {
    const [greeting, setGreeting] = useState("");
    const [quoteOfTheDay, setQuoteOfTheDay] = useState("");


    const { user } = useContext(AuthContext);
    const { isLoading,
        isClockIn,
        onClockIn,
        onClockOut,
        officeInTime,
        officeOutTime,
        isClockOut,
        officeHours,
        checkInOut
    } = useContext(ClockInOutContext);

    // generate some motivational speech
    useEffect(() => {
        checkInOut();
        const randomNumber = Math.floor(Math.random() * qoutes.length);
        setQuoteOfTheDay(qoutes[randomNumber]);
    }, []);
    const changeQuote = () => {
        const randomNumber = Math.floor(Math.random() * qoutes.length);
        setQuoteOfTheDay(qoutes[randomNumber]);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const hours = date.getHours();
            if (hours < 12) {
                setGreeting("Good Morning!");

            } else if (hours < 18) {
                setGreeting("Good Afternoon!");
            } else {
                setGreeting("Good Evening!");
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    const submitClockInOut = () => {
        if (!isClockIn) {
            onClockIn();
        } else {
            createTwoButtonAlert();
        }
    }

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Warning!",
            "Are you sure you want to clock out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => onClockOut() }
            ]
        );

    const convertTimeToCurrentTimezone = (time) => {

        //  console.log(time);
        var testDateUtc = Moment.utc(time);
        var localDate = testDateUtc.local();
        // reutrn time into local timezone AM/PM
        return localDate.format("h:mm A");

    }


    return (
        <>
            <SafeContainer >
                <GreetingView>
                    <GreetingTitle>{greeting} {user.name}</GreetingTitle>
                    <Spacer size="medium" />
                    <QuoteView >
                        <TouchableOpacity onPress={changeQuote}>
                            <QuoteText variant="caption" >
                                "{quoteOfTheDay.quoteText}" - {quoteOfTheDay.quoteAuthor}
                            </QuoteText>
                        </TouchableOpacity>
                    </QuoteView>
                    <Spacer size="large" />
                </GreetingView>

                {isClockIn &&
                    <OfficeTimingView>
                        {/* show Hour:min AM with moment js */}

                        <Text>Today's Office In Time :   {convertTimeToCurrentTimezone(officeInTime)} </Text>
                        <Spacer size="small" />
                        {isClockOut && <Text>Today's Office Out Time :  {convertTimeToCurrentTimezone(officeOutTime)}  </Text>}
                    </OfficeTimingView>
                }
                {isLoading ? (
                    <LoadingView>
                        <ActivityIndicator size="large" animating={true} color={Colors.orange800} />
                    </LoadingView>
                ) : (

                    (isClockIn && isClockOut) ? (
                        <SignInView>
                            <View>
                                <ClockInOutSuccessText variant="body">Thanks For Being A Part Of Express Family</ClockInOutSuccessText>
                            </View>
                        </SignInView>

                    ) : (
                        <SignInView>
                            <TouchableOpacity
                                onPress={submitClockInOut}
                            >
                                <SignInButton
                                    style={{
                                        backgroundColor: !isClockIn ? Colors.white : Colors.red400,
                                        borderColor: !isClockIn ? Colors.white : Colors.red400,
                                    }}
                                    mode="text" color={!isClockIn ? '#000' : '#fff'}
                                >
                                    {isClockIn ? 'Office Out' : 'Office In'}
                                </SignInButton>
                            </TouchableOpacity>
                        </SignInView>
                    ))
                }

                {/* <StatusBar animated={true} barStyle="light-content" /> */}
            </SafeContainer>
        </>
    );
}
