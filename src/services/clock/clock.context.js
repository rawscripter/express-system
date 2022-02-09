import React, { useState, createContext, useEffect } from 'react';
import { todaysClockStatus, storeClockIn, storeClockOut } from './clock.service';
import moment from 'moment';
export const ClockInOutContext = createContext();

export const ClockInOutContextProvider = ({ children }) => {

    const [clockInOut, setClockInOut] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isClockIn, setIsClockIn] = useState(false);
    const [isClockOut, setIsClockOut] = useState(false);
    const [officeInTime, setOfficeInTime] = useState("");
    const [officeOutTime, setOfficeOutTime] = useState("");
    const [officeHours, setOfficeHours] = useState(0);

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
    // TODO: COUNT OFFICE HOURS
    // useEffect(() => {
    //     let inTime = Date.parse(officeInTime.replace(/-/g, '/'));
    //     let outTime = Date.parse(moment(new Date()).utc().utcOffset("-05:00").format("YYYY-MM-DD HH:mm:ss").replace(/-/g, '/'));
    //     if (isClockOut) {
    //         outTime = Date.parse(officeOutTime.replace(/-/g, '/'));
    //     }
    //     let diff = outTime - inTime;
    //     let hours = Math.floor(diff / (1000 * 60 * 60));
    //     let minutes = Math.floor((diff / (1000 * 60)) % 60);
    //     let seconds = Math.floor((diff / 1000) % 60);
    //     setOfficeHours(hours + ":" + minutes + ":" + seconds);

    // }, []) 
    const onClockIn = () => {
        setIsLoading(true);
        setError(null);
        storeClockIn()
            .then(response => {
                setClockInOut(response.data.data);
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
            officeOutTime,
            officeHours,
            checkInOut
        }}>
            {children}
        </ClockInOutContext.Provider>
    )
}