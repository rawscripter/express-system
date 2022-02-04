import React, { useState, createContext, useEffect } from 'react';
import { todaysClockStatus, storeClockIn, storeClockOut } from './clock.service';

export const ClockInOutContext = createContext();

export const ClockInOutContextProvider = ({ children }) => {

    const [clockInOut, setClockInOut] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isClockIn, setIsClockIn] = useState(false);
    const [isClockOut, setIsClockOut] = useState(false);
    const [officeInTime, setOfficeInTime] = useState("");
    const [officeOutTime, setOfficeOutTime] = useState("");

    useEffect(() => {
        if (clockInOut.clockIn) {
            setIsClockIn(true);
            setOfficeInTime(clockInOut.clockIn)
        }
        if (clockInOut.clockOut) {
            setIsClockOut(true);
            setOfficeOutTime(clockInOut.clockOut)
        }
    }, [clockInOut])



    const onClockIn = () => {
        setIsLoading(true);
        setError(null);
        storeClockIn()
            .then(response => {
                setClockInOut(response.data.data);
                console.log(response.data.data);
                setIsLoading(false);
                setIsClockIn(true);
                setIsClockOut(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    };
    const onClockOut = () => {
        setIsLoading(true);
        setError(null);
        storeClockOut()
            .then(response => {
                setClockInOut(response.data.data);
                setIsLoading(false);
                // setIsClockIn(false);
                setIsClockOut(true);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    };





    const checkInOut = async () => {
        setIsLoading(true);
        setError(null);
        todaysClockStatus()
            .then(response => {
                setClockInOut(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        checkInOut();
    }, []);
    return (
        <ClockInOutContext.Provider value={{
            clockInOut,
            isLoading,
            error,
            onClockIn,
            onClockOut,
            isClockIn,
            isClockOut,
            officeInTime,
            officeOutTime
        }}>
            {children}
        </ClockInOutContext.Provider>
    )
}