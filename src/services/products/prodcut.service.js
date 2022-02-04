
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchProduct = async (barcode) => {
    const token = await AsyncStorage.getItem('token');
    return new Promise((resolve, reject) => {
        //send fetch request to server
        fetch('http://127.0.0.1:8000/api/products/serach/' + barcode,
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