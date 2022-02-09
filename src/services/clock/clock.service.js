
import AsyncStorage from '@react-native-async-storage/async-storage';

export const todaysClockStatus = async (barcode) => {
    const token = await AsyncStorage.getItem('token');
    return new Promise((resolve, reject) => {
        //send fetch request to server
        fetch('https://www.express-systems.net/api/me/today/clock-status',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(res => {
                if (res.status == "error") {
                    reject(res.message);
                } else {
                    resolve(res);
                }
            })
            .catch(error => {
                console.log(error);
                reject("Something went wrong. Please try again later.");
            }
            )
    })
};

export const storeClockIn = async (barcode) => {
    const token = await AsyncStorage.getItem('token');
    return new Promise((resolve, reject) => {
        //send fetch request to server
        fetch('https://www.express-systems.net/api/me/today/clock-in',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(res => {
                if (res.status == "error") {
                    reject(res.message);
                } else {
                    resolve(res);
                }
            })
            .catch(error => {
                console.log(error);
                reject("Something went wrong. Please try again later.");
            }
            )
    })
};
export const storeClockOut = async (barcode) => {
    const token = await AsyncStorage.getItem('token');
    return new Promise((resolve, reject) => {
        //send fetch request to server
        fetch('https://www.express-systems.net/api/me/today/clock-out',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(res => {
                if (res.status == "error") {
                    reject(res.message);
                } else {
                    resolve(res);
                }
            })
            .catch(error => {
                console.log(error);
                reject("Something went wrong. Please try again later.");
            }
            )
    })
};