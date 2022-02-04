export const fetchProduct = ({ barcode }) => {
    return new Promise((resolve, reject) => {
        //send fetch request to server
        fetch('http://127.0.0.1:8000/api/products/serach/' + barcode,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
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